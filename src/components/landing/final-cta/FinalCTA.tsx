import { Button } from "../../ui/button";
import { Link } from "@tanstack/react-router";
import { SectionLayout } from "../section-layout/SectionLayout";
import { CheckCircle2 } from "lucide-react";

export function FinalCTA() {
    return (
        <SectionLayout>
            {/* Header Container */}
            <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Get Started</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Trusted Home Services <span className="text-primary">Near You</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                    Book verified professionals or join our growing network of service experts.
                </p>
            </div>

            {/* Body Container */}
            <div className="flex flex-col gap-12">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-slate-200 text-slate-900 hover:bg-slate-50 rounded-2xl font-black py-8 px-10 text-lg shadow-sm"
                    >
                        <Link to="/providers">Browse Services</Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 rounded-2xl font-black py-7 px-10 text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                    >
                        <Link to="/">Become a Provider</Link>
                    </Button>
                </div>

                {/* Features Section */}
                <div className="max-w-4xl mx-auto w-full">
                    {/* Feature List */}
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {[
                            "Verified Professionals",
                            "Transparent Pricing",
                            "Same-Day Service"
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-600">
                                <CheckCircle2 size={18} className="text-primary" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
