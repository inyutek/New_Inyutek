import { BlueprintForm } from "@/components/blueprint/BlueprintForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BlueprintPage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <Navbar />
            <div className="pt-32 pb-16 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Get Your Custom <span className="text-primary">Blueprint</span>
                    </h1>
                    <p className="text-neutral-400 text-center mb-12 text-lg">
                        Fill out the form below to receive a personalized growth blueprint for your business.
                    </p>
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8">
                        <BlueprintForm />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
