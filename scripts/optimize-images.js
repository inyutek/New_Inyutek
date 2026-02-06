const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const INPUT_DIR = path.join(process.cwd(), 'public', 'services');

const SIZES = {
    mobile: 800,
    tablet: 1200,
    desktop: 1800,
};

const FORMATS = [
    { id: 'avif', options: { quality: 50 }, ext: 'avif' },
    { id: 'webp', options: { quality: 70 }, ext: 'webp' },
];

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

async function processImage(filename) {
    const inputPath = path.join(INPUT_DIR, filename);
    const ext = path.extname(filename).toLowerCase();
    const name = path.basename(filename, ext);

    // Skip if not supported or already an optimized output file
    // We identify optimized files by checking if they end with -mobile, -tablet, -desktop
    // AND have one of the target extensions. 
    // However, the prompt says "Ignore already optimized AVIF files".
    // A safer check is to see if the filename matches our output pattern.
    const isGenerated = /-mobile\.(avif|webp)$|-tablet\.(avif|webp)$|-desktop\.(avif|webp)$/.test(filename);

    if (!SUPPORTED_EXTENSIONS.includes(ext) || isGenerated) {
        return;
    }

    // Double check if it's an AVIF file that is already optimized (User instruction: "Ignore already optimized AVIF files")
    // If the source is .avif, we skip it per instructions "Support... JPG, PNG, WebP (if unoptimized)"
    if (ext === '.avif') return;

    try {
        const stat = await fs.stat(inputPath);
        const originalSize = stat.size;
        console.log(`\nProcessing: ${filename} (${(originalSize / 1024).toFixed(2)} KB)`);

        // Process sequentially for each size/format combo to avoid memory spikes
        for (const [sizeName, width] of Object.entries(SIZES)) {
            for (const format of FORMATS) {
                const outputFilename = `${name}-${sizeName}.${format.ext}`;
                const outputPath = path.join(INPUT_DIR, outputFilename);

                if (await fs.pathExists(outputPath)) {
                    // console.log(`  Skipping ${outputFilename} (already exists)`);
                    continue;
                }

                try {
                    const pipeline = sharp(inputPath);

                    // Get metadata to avoid upscaling if the image is smaller than target
                    const metadata = await pipeline.metadata();
                    if (metadata.width && metadata.width < width) {
                        // Optional: Decide whether to upscale or keep original width. 
                        // Requirement says "Mobile width -> 800px". 
                        // Usually better NOT to upscale raster images. 
                        // But strict requirement implies generating these sizes. 
                        // I will adhere to "Mobile width -> 800px" but sharp defaults to not upscaling if 'withoutEnlargement' is used.
                        // Given "Scalability" and "Optimization" focus, I'll allow upscaling or just execute resize. 
                        // Logic: Standard behavior is usually resizing to target width.
                    }

                    await pipeline
                        .resize({ width, withoutEnlargement: true }) // Safety: don't make small images blurry
                        .toFormat(format.id, format.options)
                        .toFile(outputPath);

                    const newStat = await fs.stat(outputPath);
                    const savings = ((1 - newStat.size / originalSize) * 100).toFixed(1);

                    console.log(
                        `  ✓ ${outputFilename}: ${(newStat.size / 1024).toFixed(2)} KB ` +
                        `(${savings}% saved)`
                    );
                } catch (err) {
                    console.error(`  ❌ Error processing ${outputFilename}: ${err.message}`);
                    // Remove partial file if it exists
                    if (await fs.pathExists(outputPath)) {
                        await fs.remove(outputPath);
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Error reading ${filename}: ${err.message}`);
    }
}

async function main() {
    try {
        // Ensure directory exists
        await fs.ensureDir(INPUT_DIR);

        const files = await fs.readdir(INPUT_DIR);

        console.log(`Starting image optimization in ${INPUT_DIR}...`);
        console.log(`Found ${files.length} file(s).`);

        // Process sequentially to be safe with memory
        for (const file of files) {
            await processImage(file);
        }

        console.log('\nOptimization complete!');
    } catch (err) {
        console.error('Fatal error:', err);
        process.exit(1);
    }
}

main();
