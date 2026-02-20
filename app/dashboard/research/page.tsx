"use client";

import { motion } from "framer-motion";
import { FlaskConical, FileText, Upload, Download } from "lucide-react";
import { useState } from "react";

const mockResearch = [
  { id: 1, title: "Optimizing AI Latency in Edge Networks", status: "Published", date: "Jan 15, 2026", citations: 142 },
  { id: 2, title: "Pedagogical Impacts of LLMs in Computer Science", status: "Under Review", date: "Feb 02, 2026", citations: 0 },
  { id: 3, title: "Next-Gen Database Synchronization Protocols", status: "Draft", date: "Feb 18, 2026", citations: 0 },
];

export default function ResearchPage() {
  const [papers, setPapers] = useState(mockResearch);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setPapers([{ id: Date.now(), title: "New Draft Document", status: "Draft", date: "Today", citations: 0 }, ...papers]);
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Research Lab</h1>
          <p className="text-muted-foreground mt-1">Manage publications, drafts, and ongoing studies.</p>
        </div>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-sm disabled:opacity-70"
        >
          {isUploading ? <FlaskConical className="w-4 h-4 animate-pulse" /> : <Upload className="w-4 h-4" />} 
          {isUploading ? 'Uploading...' : 'Upload Draft'}
        </button>
      </div>

      <div className="grid gap-4">
        {papers.map((paper, i) => (
          <motion.div 
            key={paper.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border/60 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-border transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl rounded-full" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">{paper.title}</h3>
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mt-1">
                  <span className={`uppercase tracking-widest px-2 py-0.5 rounded-md ${paper.status === 'Published' ? 'bg-primary/20 text-primary' : paper.status === 'Under Review' ? 'bg-amber-500/20 text-amber-500' : 'bg-accent text-foreground'}`}>
                    {paper.status}
                  </span>
                  <span>{paper.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:ml-auto relative z-10">
              <div className="text-center sm:text-right">
                <span className="block text-2xl font-black">{paper.citations}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Citations</span>
              </div>
              <button className="w-10 h-10 rounded-full bg-accent text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors shadow-sm" title="Download PDF">
                <Download className="w-5 h-5" />
              </button>
            </div>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
