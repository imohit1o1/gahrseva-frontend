import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { providerDetailsRoute } from '../router/routes';
import {
    MapPin,
    Clock,
    Star,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
    CreditCard,
    Zap,
    Calendar,
    Loader2
} from 'lucide-react';
import { useProvider } from '../hooks/useProviders';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
    Dialog,
    DialogContent,
} from "../components/ui/dialog";
import { cn } from '../lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
    'Home Cleaning': 'bg-blue-50 text-blue-600 border-blue-100',
    'Plumbing': 'bg-cyan-50 text-cyan-600 border-cyan-100',
    'Electrical': 'bg-amber-50 text-amber-600 border-amber-100',
    'Carpentry': 'bg-orange-50 text-orange-600 border-orange-100',
    'Painting': 'bg-rose-50 text-rose-600 border-rose-100',
    'Appliance Repair': 'bg-purple-50 text-purple-600 border-purple-100',
    'Pest Control': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Gardening': 'bg-lime-50 text-lime-600 border-lime-100',
};

export default function ServiceProviderDetails() {
    const { providerId } = providerDetailsRoute.useParams();
    const { data: providerResponse, isLoading, error } = useProvider(providerId);
    const [isPaymentStep, setIsPaymentStep] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [simulationStep, setSimulationStep] = useState(0);
    const [isSimulationActive, setIsSimulationActive] = useState(false);

    const provider = providerResponse?.data;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
                <p className="text-slate-500 font-medium animate-pulse">Loading expert details...</p>
            </div>
        );
    }

    if (error || !provider) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="h-10 w-10 text-rose-500" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 mb-2">Expert Not Found</h1>
                <p className="text-slate-500 max-w-md mb-8">
                    We couldn't find the service provider you're looking for. They might have updated their profile or the link is invalid.
                </p>
                <Link to="/service-providers">
                    <Button variant="outline" className="rounded-2xl px-8 h-12 font-bold">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Experts
                    </Button>
                </Link>
            </div>
        );
    }

    const name = provider.user_id?.display_name || 'Service Provider';
    const categoryName = provider.category?.name || provider.category_id?.name || 'General';

    const handleFakePayment = () => {
        setIsSimulationActive(true);
        setSimulationStep(0);
        setIsProcessing(true);

        const timeline = [
            { step: 1, delay: 2000 }, // processing
            { step: 2, delay: 4000 }, // confirming
            { step: 3, delay: 6000 }, // done
        ];

        timeline.forEach(({ step, delay }) => {
            setTimeout(() => {
                if (step === 3) {
                    setIsSimulationActive(false);
                    setPaymentSuccess(true);
                    setIsProcessing(false);
                } else {
                    setSimulationStep(step);
                }
            }, delay);
        });
    };

    if (paymentSuccess) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-4 text-center">
                <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white p-12 border border-slate-100">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Booking Confirmed</h1>
                    <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed max-w-sm mx-auto">
                        Your request with <span className="text-slate-900 font-bold">{name}</span> has been successfully placed. They will contact you shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/">
                            <Button className="rounded-xl px-8 h-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/10">
                                Return Home
                            </Button>
                        </Link>
                        <Button variant="outline" className="rounded-xl px-8 h-12 font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                            Manage Bookings
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
            <Link to="/service-providers" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-primary transition-colors mb-8 group">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Back to results
            </Link>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-21/9 group border border-slate-200/60 shadow-sm">
                        <img
                            src={provider.avatar}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/20 to-transparent" />

                        {/* Availability Tag */}
                        {provider.is_available && (
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-emerald-700">Active Now</span>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 text-white">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{name}</h1>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "shrink-0 font-bold text-[9px] uppercase tracking-wider py-1 px-3 rounded-full border-none",
                                    CATEGORY_COLORS[categoryName] || 'bg-white/20 backdrop-blur-md text-white'
                                )}
                            >
                                {categoryName}
                            </Badge>
                        </div>
                    </section>

                    {/* Quick Stats Pills */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                            <Star size={14} className="fill-primary text-primary" />
                            <span className="text-xs font-bold text-slate-900">{provider.rating || '4.8'}</span>
                            <span className="text-[10px] text-slate-500 font-medium">({provider.reviews || '120'})</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                            <Clock size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-900">{provider.experience}Y Experience</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                            <MapPin size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-900">{provider.area}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold text-slate-900">Verified Expert</span>
                        </div>
                    </div>

                    {/* Performance Analytics Section */}
                    {provider.analytics && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 px-1">Expert Performance</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Primary Stats */}
                                <div className="bg-slate-50/50 border border-slate-100/80 p-5 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-sans">
                                        <span className="h-1 w-1 rounded-full bg-primary" />
                                        Total Jobs
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{provider.analytics.totalBookings}</p>
                                </div>

                                <div className="bg-slate-50/50 border border-slate-100/80 p-5 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-sans">
                                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                        Completed
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{provider.analytics.completedBookings}</p>
                                </div>

                                <div className="bg-slate-50/50 border border-slate-100/80 p-5 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-sans">
                                        <span className="h-1 w-1 rounded-full bg-amber-400" />
                                        Avg Rating
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                            {provider.analytics.averageRating?.toFixed(1) || provider.rating?.toFixed(1) || '4.8'}
                                        </p>
                                        <Star size={16} className="fill-amber-400 text-amber-400" />
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 border border-slate-100/80 p-5 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-sans">
                                        <span className="h-1 w-1 rounded-full bg-indigo-500" />
                                        Success Rate
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {provider.analytics.totalBookings > 0
                                            ? Math.round((provider.analytics.completedBookings / provider.analytics.totalBookings) * 100)
                                            : 100}%
                                    </p>
                                </div>
                            </div>

                            {/* Secondary Stats Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="border border-slate-100 rounded-xl px-4 py-3 flex justify-between items-center bg-white/50">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                                    <span className="text-sm font-bold text-slate-700">{provider.analytics.pendingBookings}</span>
                                </div>
                                <div className="border border-slate-100 rounded-xl px-4 py-3 flex justify-between items-center bg-white/50">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Active</span>
                                    <span className="text-sm font-bold text-primary">{provider.analytics.activeBookings}</span>
                                </div>
                                <div className="border border-slate-100 rounded-xl px-4 py-3 flex justify-between items-center bg-white/50">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Cancelled</span>
                                    <span className="text-sm font-bold text-rose-500">{provider.analytics.cancelledBookings}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">About the Expert</h2>
                        <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100">
                            <p className="text-slate-600 font-medium leading-relaxed text-base italic">
                                "{provider.description}"
                            </p>

                            <div className="mt-8 pt-8 border-t border-slate-200/60 grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        Work Process
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {['Inspection & Diagnosis', 'Transparent Estimation', 'Professional Execution', 'Post-Service Check'].map((step, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        Key Highlights
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {['High Quality Tools', 'Eco-friendly Products', 'Safe Work Practice', 'Instant Invoicing'].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Checkout/BookingCard */}
                <div className="lg:col-span-1">
                    <div className="sticky top-10 space-y-6">
                        <div className="p-2">
                            {!isPaymentStep ? (
                                <div className="space-y-6">
                                    <div className="flex items-baseline gap-1.5 px-1">
                                        <span className="text-4xl font-bold text-slate-900 tracking-tight">₹{provider.base_price}</span>
                                        <span className="text-slate-400 text-sm font-semibold">/ visit</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-1">
                                            <Zap size={14} className="text-primary" />
                                            <span className="text-xs font-bold text-slate-900">Express Scheduling</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-1">
                                            <ShieldCheck size={14} className="text-emerald-500" />
                                            <span className="text-xs font-bold text-slate-900">30-Day Warranty</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full rounded-xl h-12 font-bold text-sm bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white group border-none shadow-none"
                                        onClick={() => setIsPaymentStep(true)}
                                    >
                                        Book Now
                                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                    </Button>

                                    <div className="flex items-center justify-center gap-1.5 opacity-40 grayscale group hover:grayscale-0 transition-all cursor-default">
                                        <ShieldCheck size={10} className="text-emerald-500" />
                                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Safe Checkout</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 rounded-lg p-0 hover:bg-slate-50 text-slate-600"
                                            onClick={() => setIsPaymentStep(false)}
                                        >
                                            <ArrowLeft size={16} />
                                        </Button>
                                        <h3 className="text-sm font-bold text-slate-900">Checkout</h3>
                                    </div>

                                    <div className="space-y-4 px-1">
                                        <div className="space-y-2.5">
                                            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                <span>Standard visit</span>
                                                <span className="text-slate-900">₹{provider.base_price}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                <span>Convenience fee</span>
                                                <span className="text-slate-900">₹49</span>
                                            </div>
                                            <div className="h-px bg-slate-100" />
                                            <div className="flex justify-between items-center text-sm font-bold">
                                                <span className="text-slate-900">Total</span>
                                                <span className="text-primary tracking-tight font-black text-lg">₹{provider.base_price + 49}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                                <input
                                                    disabled
                                                    value="4242 4242 4242 4242"
                                                    className="w-full bg-slate-50 border border-slate-100/60 rounded-xl h-10 pl-10 pr-4 text-xs font-mono text-slate-400 outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input disabled value="12/28" className="bg-slate-50 border border-slate-100/60 rounded-xl h-10 px-4 text-xs font-mono text-slate-400 outline-none" />
                                                <input disabled value="***" className="bg-slate-50 border border-slate-100/60 rounded-xl h-10 px-4 text-xs font-mono text-slate-400 outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full rounded-xl h-12 font-bold text-sm bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white border-none shadow-none disabled:opacity-50"
                                        onClick={handleFakePayment}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="animate-spin h-4 w-4" />
                                                Processing...
                                            </div>
                                        ) : (
                                            `Confirm Payment`
                                        )}
                                    </Button>
                                    <p className="text-center text-[8px] text-slate-300 font-medium">
                                        Simulation • No real funds will be charged
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 px-3 py-4 border border-slate-100/80 rounded-2xl bg-white shadow-sm border-dashed">
                            <Calendar className="h-4 w-4 text-primary/40 shrink-0" />
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-700">Instant Verification</h4>
                                <p className="text-[8px] text-slate-400 font-medium tracking-tight">Expert responds within 60 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={isSimulationActive} onOpenChange={setIsSimulationActive}>
                    <DialogContent className="sm:max-w-md border-none bg-white p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
                        <div className="relative p-10 text-center space-y-8">
                            {/* Simulation Progress Line */}
                            <div className="absolute top-24 left-[20%] right-[20%] h-0.5 border-t border-dashed border-slate-100 hidden sm:block" />

                            <div className="grid grid-cols-3 gap-8 relative z-10 pt-4">
                                {[
                                    { icon: CreditCard, label: 'Securing', active: simulationStep >= 0, finished: simulationStep > 0 },
                                    { icon: Zap, label: 'Relaying', active: simulationStep >= 1, finished: simulationStep > 1 },
                                    { icon: CheckCircle2, label: 'Success', active: simulationStep >= 2, finished: simulationStep > 2 }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 group">
                                        <div className={cn(
                                            "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-700 border shadow-sm",
                                            step.finished ? "bg-emerald-50 border-emerald-100 text-emerald-500" :
                                                step.active ? "bg-primary/5 border-primary/20 text-primary scale-110 shadow-lg shadow-primary/5" :
                                                    "bg-slate-50 border-slate-100 text-slate-300"
                                        )}>
                                            <step.icon size={24} className={cn(
                                                (!step.finished && step.active) && "animate-pulse"
                                            )} />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
                                            step.active ? "text-slate-900" : "text-slate-300"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {simulationStep === 0 && "Verifying Transaction..."}
                                    {simulationStep === 1 && "Confirming with Provider..."}
                                    {simulationStep === 2 && "Finalizing Booking..."}
                                </h3>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto italic">
                                    {simulationStep === 0 && "Hold tight, we're securely processing your visit rate through our encrypted gateway."}
                                    {simulationStep === 1 && `Dispatching your request to ${name}. Express scheduling is being prioritized.`}
                                    {simulationStep === 2 && "Encryption complete. Finalizing your dashboard entry and insurance protection."}
                                </p>
                            </div>

                            <div className="flex justify-center h-2 overflow-hidden">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1 rounded-full transition-all duration-700",
                                                simulationStep === i ? "w-4 bg-primary" : "w-1 bg-slate-100"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
