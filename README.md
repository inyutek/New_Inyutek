This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Image Optimization

This project includes an automated image optimization pipeline powered by `sharp`.

### How to Run
Run the following command to generate responsive optimized images:
```bash
npm run optimize:images
```

### Storage Location
- Source images: `/public/services/`
- Optimized output: Saved in the SAME folder (`/public/services/`) next to the originals.

### Workflow
1. **Add Images**: Place high-quality `.jpg`, `.png`, or `.webp` files into `/public/services/`.
2. **Run Optimizer**: Execute `npm run optimize:images`.
3. **Resizes**:
   - Mobile: 800px
   - Tablet: 1200px
   - Desktop: 1800px
4. **Formats**: AVIF (Q50) and WebP (Q70) generated for each size.

**Note:** The script skips existing optimized files and preserves original files. It is safe to run multiple times.

