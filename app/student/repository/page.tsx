"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, UploadCloud, FileText, Filter, CheckCircle, XCircle, Clock,
    MoreVertical, File, DownloadCloud, Image as ImageIcon, BookOpen, UserCircle
} from "lucide-react";
import { getUploadUrl, saveDocumentRecord, getLiveDocuments } from "@/app/actions/upload";

export default function RepositoryPage() {
    const [activeTab, setActiveTab] = useState<"search" | "upload">("search");

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSem, setFilterSem] = useState("");
    const [filterSub, setFilterSub] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    // Fetch results when tab is search or filters change
    useEffect(() => {
        if (activeTab !== "search") return;
        const fetchDocs = async () => {
            setIsSearching(true);
            try {
                const docs = await getLiveDocuments(searchQuery, filterSem);
                setResults(docs);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        };

        const timeout = setTimeout(fetchDocs, 400);
        return () => clearTimeout(timeout);
    }, [searchQuery, filterSem, activeTab]);

    // Upload State
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadStatus(null);

        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;
        const title = formData.get("title") as string;

        if (!file || file.size === 0) {
            setUploadStatus("Please select a valid file.");
            setIsUploading(false);
            return;
        }

        try {
            const { url, key, error } = await getUploadUrl(file.name, file.type);
            if (error || !url) throw new Error(error || "Failed to get upload URL");

            const uploadRes = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                }
            });

            if (!uploadRes.ok) throw new Error("Failed to upload to S3");

            const finalUrl = url.split("?")[0];
            formData.set("fileUrl", finalUrl);
            formData.set("format", file.type.split("/")[1]?.toUpperCase() || "UNKNOWN");

            const saveRes = await saveDocumentRecord(formData);

            if (saveRes.error) throw new Error(saveRes.error);

            setUploadStatus(saveRes.message || "Upload successful!");
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setUploadStatus(`Error: ${err.message}`);
        } finally {
            setIsUploading(false);
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
                    <div>
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <BookOpen className="w-8 h-8" />
                            Smart Repository
                        </h1>
                        <p className="text-sm font-semibold text-muted-foreground mt-1">
                            Find, view, and share educational materials across all semesters.
                        </p>
                    </div>

                    <div className="flex bg-accent border border-border rounded-xl p-1">
                        <button
                            onClick={() => setActiveTab("search")}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "search" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Browse Files
                        </button>
                        <button
                            onClick={() => setActiveTab("upload")}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Upload Material
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {activeTab === "upload" && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center mb-4 border-4 border-primary/20">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-black">Upload Document</h2>
                                <p className="text-sm text-muted-foreground font-medium mt-1">
                                    Accepted formats: PDF, PPTX, DOCX, JPG/PNG (Max 50MB)
                                </p>
                            </div>

                            {uploadStatus && (
                                <div className={`p-4 rounded-xl text-sm font-bold mb-6 flex items-center gap-2 ${uploadStatus.includes("Error") ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'}`}>
                                    {uploadStatus.includes("Error") ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                    {uploadStatus}
                                </div>
                            )}

                            <form onSubmit={handleUpload} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5 focus-within:text-primary">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Document Title</label>
                                        <input name="title" required type="text" placeholder="e.g. Chapter 4 Notes" className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                                    </div>
                                    <div className="space-y-1.5 focus-within:text-primary">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Semester</label>
                                        <select name="semester" required className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all">
                                            <option value="">Select Semester</option>
                                            {Array.from({ length: 8 }, (_, i) => <option key={i} value={`Semester ${i + 1}`}>Semester {i + 1}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5 focus-within:text-primary">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Subject</label>
                                        <input name="subject" required type="text" placeholder="e.g. Operating Systems" className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                                    </div>
                                    <div className="space-y-1.5 focus-within:text-primary">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Unit / Module</label>
                                        <input name="unit" required type="text" placeholder="e.g. Unit 2" className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Attach File</label>
                                    <div className="relative border-2 border-dashed border-border/80 bg-accent/30 rounded-2xl p-8 hover:bg-accent/50 hover:border-primary/50 transition-all text-center group">
                                        <input
                                            name="file"
                                            type="file"
                                            required
                                            accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <FileText className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 transition-all" />
                                        <p className="mt-3 text-sm font-bold text-foreground">Drag & Drop or <span className="text-primary underline">Browse File</span></p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 active:scale-[0.98]"
                                >
                                    {isUploading ? (
                                        <span className="flex items-center gap-2">Uploading to Server... <Clock className="w-4 h-4 animate-spin" /></span>
                                    ) : "Submit Document"}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === "search" && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Search Title</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Search for notes, assignments..."
                                            className="w-full bg-background/50 border-2 border-border/80 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-48 space-y-1.5">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Semester</label>
                                    <select
                                        className="w-full bg-background/50 border-2 border-border/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                        value={filterSem} onChange={(e) => setFilterSem(e.target.value)}
                                    >
                                        <option value="">All Semesters</option>
                                        {Array.from({ length: 8 }, (_, i) => <option key={i} value={`Semester ${i + 1}`}>Semester {i + 1}</option>)}
                                    </select>
                                </div>

                                <button className="w-full md:w-auto px-6 py-3.5 bg-secondary text-secondary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all h-[46px]">
                                    <Filter className="w-4 h-4" /> Filter
                                </button>
                            </div>

                            {isSearching ? (
                                <div className="text-center py-20 bg-card border-2 border-dashed border-border rounded-3xl">
                                    <Clock className="w-8 h-8 text-primary mx-auto animate-spin mb-4" />
                                    <h3 className="text-xl font-black mb-1">Searching...</h3>
                                </div>
                            ) : results.length === 0 ? (
                                <div className="text-center py-20 bg-card border-2 border-dashed border-border rounded-3xl">
                                    <div className="w-16 h-16 bg-accent border border-border mx-auto rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-black mb-1">No Documents Found</h3>
                                    <p className="text-muted-foreground text-sm font-semibold max-w-sm mx-auto">
                                        Try adjusting your filters or search query to find materials.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {results.map((doc) => (
                                        <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg transition-all group flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center shrink-0">
                                                        {getFormatIcon(doc.format)}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-background border border-border/50 px-2 py-1 rounded-lg">
                                                        {doc.unit}
                                                    </span>
                                                </div>

                                                <h3 className="font-extrabold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                                    {doc.title}
                                                </h3>
                                                <p className="text-xs font-bold text-muted-foreground mb-4">{doc.subject} • {doc.semester}</p>
                                            </div>

                                            <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <UserCircle className="w-6 h-6 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-[10px] font-bold text-foreground leading-none">{doc.uploader?.name || "Unknown"}</p>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 mt-0.5">{doc.uploader?.role}</p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={doc.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                                                >
                                                    <DownloadCloud className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
