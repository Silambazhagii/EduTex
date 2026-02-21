"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText, CheckCircle, XCircle, Clock,
    BookOpen, UserCircle, DownloadCloud, Image as ImageIcon, File,
    X, Lock, ShieldAlert, ArrowLeft
} from "lucide-react";
import { getPendingDocuments, reviewDocument } from "@/app/actions/upload";

export default function FacultyReviewUploads() {
    const router = useRouter();
    const [uploads, setUploads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewUpload, setViewUpload] = useState<any | null>(null);

    useEffect(() => {
        const fetchUploads = async () => {
            setLoading(true);
            try {
                const pendingDocs = await getPendingDocuments();
                setUploads(pendingDocs);
            } catch (err) {
                console.error("Failed to fetch pending uploads:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUploads();
    }, []);

    const handleAction = async (id: string, action: 'Approve' | 'Reject') => {
        try {
            // Optimistic update
            setUploads(prev => prev.filter(u => u.id !== id));
            await reviewDocument(id, action);
            setViewUpload(null);
        } catch (e) {
            console.error(e);
            // Fallback: reload fetch
            const pendingDocs = await getPendingDocuments();
            setUploads(pendingDocs);
        }
    };

    const getFormatIcon = (format: string) => {
        if (format.includes("PDF")) return <FileText className="w-5 h-5 text-red-500" />;
        if (format.includes("PPT") || format.includes("PRESENTATION")) return <File className="w-5 h-5 text-orange-500" />;
        if (format.includes("DOC") || format.includes("WORD")) return <FileText className="w-5 h-5 text-blue-500" />;
        if (format.includes("JPG") || format.includes("JPEG") || format.includes("PNG")) return <ImageIcon className="w-5 h-5 text-emerald-500" />;
        return <File className="w-5 h-5 text-muted-foreground" />;
    };

    return (
        <div className="min-h-screen dotgrid bg-linear-to-br from-background via-accent/30 to-background text-foreground font-sans p-4 sm:p-6 lg:p-8">
            <main className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 bg-accent hover:bg-muted border border-border rounded-xl transition-all">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                                <ShieldAlert className="w-8 h-8" />
                                Review Uploads
                            </h1>
                            <p className="text-sm font-semibold text-muted-foreground mt-1">
                                Gatekeeper System: Approve student materials for the Smart Repository.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl"
                >
                    {loading ? (
                        <div className="text-center py-20">
                            <Clock className="w-8 h-8 text-primary mx-auto animate-spin mb-4" />
                            <h3 className="text-xl font-black mb-1">Loading Pending Documents...</h3>
                        </div>
                    ) : uploads.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl bg-background/50">
                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 mx-auto rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-black mb-1">All Caught Up!</h3>
                            <p className="text-muted-foreground text-sm font-semibold max-w-sm mx-auto">
                                There are no pending documents waiting for your approval.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence>
                                {uploads.map((doc) => (
                                    <motion.div
                                        key={doc.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                        className="bg-background border-2 border-border/80 rounded-2xl p-5 hover:border-primary/50 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center shrink-0">
                                                    {getFormatIcon(doc.format)}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-lg flex items-center gap-1">
                                                    <Clock size={10} /> Pending
                                                </span>
                                            </div>

                                            <h3 className="font-extrabold text-foreground leading-tight mb-1 line-clamp-2">
                                                {doc.title}
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground mb-4">
                                                {doc.subject} • {doc.unit} • {doc.semester}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border mt-auto flex flex-col gap-3">
                                            <div className="flex items-center gap-2">
                                                <UserCircle className="w-6 h-6 text-muted-foreground" />
                                                <div>
                                                    <p className="text-[10px] font-bold text-foreground leading-none">{doc.uploader?.name || "Unknown Student"}</p>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 mt-0.5">{doc.uploader?.usn || "N/A"}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 w-full mt-2">
                                                <button onClick={() => setViewUpload(doc)} className="flex-1 bg-accent hover:bg-muted text-foreground py-2 text-xs font-bold rounded-xl transition-colors border border-border">
                                                    Inspect File
                                                </button>
                                                <button onClick={() => handleAction(doc.id, 'Approve')} className="w-10 flex items-center justify-center bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-xl border border-green-500/20 transition-colors">
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button onClick={() => handleAction(doc.id, 'Reject')} className="w-10 flex items-center justify-center bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl border border-destructive/20 transition-colors">
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

            </main>

            {/* Modal */}
            {viewUpload && (
                <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-4 flex items-center justify-center" onClick={() => setViewUpload(null)}>
                    <div className="h-[90vh] w-full max-w-5xl bg-card border-2 border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-5 border-b-2 border-border bg-background/50">
                            <div>
                                <h2 className="text-xl font-black text-primary flex items-center gap-2">
                                    {getFormatIcon(viewUpload.format)} {viewUpload.title}
                                </h2>
                                <p className="text-xs font-bold text-muted-foreground mt-1">Uploaded by {viewUpload.uploader?.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={viewUpload.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-accent hover:bg-muted text-foreground px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all border border-border"
                                >
                                    <DownloadCloud size={14} /> Download to View Safe
                                </a>
                                <button onClick={() => setViewUpload(null)} className="p-2 text-muted-foreground hover:text-foreground transition-colors ml-2 bg-background border border-border rounded-xl">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* File Preview Area Configured for S3 URLs if available */}
                        <div className="flex-1 bg-muted/30 p-4">
                            {viewUpload.format === "PDF" ? (
                                <iframe src={viewUpload.fileUrl} className="w-full h-full rounded-2xl border-2 border-border bg-background shadow-inner" />
                            ) : ["JPG", "JPEG", "PNG"].includes(viewUpload.format) ? (
                                <div className="w-full h-full flex items-center justify-center rounded-2xl border-2 border-border bg-background shadow-inner p-4">
                                    <img src={viewUpload.fileUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl" />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center rounded-2xl border-2 border-border bg-background shadow-inner flex-col text-center p-8">
                                    <Lock size={48} className="text-muted-foreground opacity-30 mb-4" />
                                    <h3 className="text-lg font-black text-foreground">Preview Unavailable</h3>
                                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">This file format cannot be safely previewed entirely in the browser. Please tap the download button above to verify its contents locally.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-5 border-t-2 border-border bg-background/50 flex justify-end gap-3">
                            <button
                                onClick={() => handleAction(viewUpload.id, 'Reject')}
                                className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive px-6 py-3 rounded-xl font-bold transition-all border border-destructive/20"
                            >
                                <XCircle size={18} /> Reject Upload
                            </button>
                            <button
                                onClick={() => handleAction(viewUpload.id, 'Approve')}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-black transition-all shadow-md"
                            >
                                <CheckCircle size={18} /> Approve & Publish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
