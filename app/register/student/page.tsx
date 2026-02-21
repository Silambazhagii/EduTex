"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, Loader2, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { registerStudent } from "@/app/actions/auth";

export default function StudentRegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        try {
            const res = await registerStudent(formData);

            if (res?.error) {
                setError(res.error);
            } else if (res?.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
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
                    className="w-full max-w-md p-8 bg-card/80 backdrop-blur-3xl border border-border/60 rounded-3xl shadow-2xl flex flex-col items-center text-center focus:outline-none"
                >
                    <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">Registration Successful</h2>
                    <p className="text-muted-foreground font-medium mb-6">Redirecting to login portal...</p>
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/60 text-primary-foreground rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                        <BookOpen className="w-7 h-7" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Student Registration</h1>
                    <p className="text-muted-foreground text-sm font-semibold mt-1.5">Create your EduTex portal access</p>
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

                <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Ex. John Doe"
                                className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">USN</label>
                            <input
                                name="usn"
                                type="text"
                                placeholder="Ex. 1DS20CS001"
                                className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold uppercase focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 placeholder:lowercase"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Semester</label>
                        <select
                            name="semester"
                            className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground appearance-none"
                            required
                        >
                            <option value="" disabled selected>Select your current semester</option>
                            {Array.from({ length: 8 }, (_, i) => (
                                <option key={i + 1} value={`Sem ${i + 1}`}>Semester {i + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Email <span className="opacity-50">(Optional)</span></label>
                        <input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40"
                        />
                    </div>

                    <div className="space-y-1.5 pt-2">
                        <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Create Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account <ArrowRight className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center relative z-10">
                    <Link
                        href="/login"
                        className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
