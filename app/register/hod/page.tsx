"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ArrowRight, Loader2, Landmark, AlertCircle, CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { registerHod } from "@/app/actions/auth";

export default function HodRegisterWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        collegeName: "",
        department: "",
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = () => {
        setError("");
        if (step === 1) {
            if (!formData.collegeName || !formData.department) {
                setError("Please fill out all institution details.");
                return;
            }
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        setError("");
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 2) return;

        setIsLoading(true);
        setError("");

        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => data.append(key, val));

        try {
            const res = await registerHod(data);
            if (res?.error) {
                setError(res.error);
            } else if (res?.success) {
                setSuccess(true);
            }
        } catch (err: any) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground dotgrid p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md p-8 bg-card/80 backdrop-blur-3xl border border-border/60 rounded-3xl shadow-2xl flex flex-col items-center text-center"
                >
                    <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                        <ShieldAlert className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black mb-3">Application Submitted</h2>
                    <p className="text-muted-foreground font-medium mb-6 text-sm">
                        Your Head of Department account has been sent to the Superadmin for approval.
                        You will be able to log in once approved.
                    </p>
                    <Link href="/login" className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                        Back to Login
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground dotgrid selection:bg-primary/20 p-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg p-6 sm:p-8 bg-card/80 backdrop-blur-3xl border border-border/60 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden"
            >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/60 text-accent-foreground rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                        <Landmark className="w-7 h-7" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-center">HOD Registration</h1>
                    <p className="text-muted-foreground text-sm font-semibold mt-1.5 text-center px-4">Apply for administrative access to your department</p>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8 relative z-10 mx-auto w-3/4">
                    <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= 1 ? "bg-primary" : "bg-primary/20"}`} />
                    <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= 2 ? "bg-primary" : "bg-primary/20"}`} />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold rounded-xl flex items-start gap-2"
                    >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="relative z-10 overflow-hidden min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">College/Institution Name</label>
                                    <input
                                        name="collegeName"
                                        type="text"
                                        value={formData.collegeName}
                                        onChange={handleChange}
                                        placeholder="Ex. Global Academy of Technology"
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Department</label>
                                    <input
                                        name="department"
                                        type="text"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="Ex. Computer Science & Engineering"
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all mt-6"
                                >
                                    Next Step <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4 flex flex-col h-full"
                            >
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Your Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Dr. Sarah Jenkins"
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Official Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="sarah.j@college.edu"
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="flex gap-3 pt-2 mt-auto">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex-1 bg-secondary text-secondary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2] bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Submit App <ArrowRight className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                <div className="mt-8 text-center relative z-10 pt-4 border-t border-border/50">
                    <Link
                        href="/login"
                        className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel and Return to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
