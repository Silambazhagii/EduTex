// components/notices-panel.tsx
'use client';
import { useState } from 'react';
import { Paperclip, AlertCircle, X } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  body: string;
  date: string;
  attachment?: { name: string; url: string; type: string };
}

// ── Shared static notices (replace with API fetch later) ──
const SHARED_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Robotics Workshop Circular',
    body: 'Its conducted on 20th February 2026, Faculties please share it with your students',
    date: 'Feb 20',
    attachment: {
      name: 'Robotics_Workshop_Circular.pdf',
      url: 'https://drive.google.com/file/d/11SrEjfVbHN88uNUw4q3fH8NhECR9jgVt/preview',
      type: 'application/pdf',
    },
  },
  { id: 2, title: 'SOP Annual Day 2K26',  body: 'New approval workflow is now live from Feb 18.', date: 'Feb 18' },
  { id: 3, title: 'Timetable Update',      body: 'Updated timetable published – check your schedule.', date: 'Feb 17' },
  { id: 4, title: 'Exam Duty',             body: 'Exam duty assignments published for March 2026.', date: 'Feb 16' },
];

interface NoticesPanelProps {
  notices?: Notice[];       // optional override (admin passes its own state)
  maxHeight?: string;       // e.g. 'max-h-56' or 'max-h-72'
}

export default function NoticesPanel({
  notices = SHARED_NOTICES,
  maxHeight = 'max-h-56',
}: NoticesPanelProps) {
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);

  return (
    <>
      {/* ── Notice List ── */}
      <div className={`space-y-3 ${maxHeight} overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40`}>
        {notices.map((n) => (
          <div
            key={n.id}
            onClick={() => setViewNotice(n)}
            className="p-4 bg-accent/60 rounded-xl border-l-4 border-primary hover:bg-accent cursor-pointer transition-all text-sm text-foreground group"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="font-semibold group-hover:text-primary transition-colors">{n.title}</span>
              <div className="flex items-center gap-1 shrink-0">
                {n.attachment && (
                  <span className="flex items-center gap-0.5 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                    <Paperclip size={9} />
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{n.body}</p>
          </div>
        ))}

        {notices.length === 0 && (
          <div className="py-8 text-center text-muted-foreground text-xs font-semibold border-2 border-dashed border-border rounded-xl">
            No notices posted yet.
          </div>
        )}
      </div>

      {/* ── View Notice Modal ── */}
      {viewNotice && (
        <div
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setViewNotice(null)}
        >
          <div
            className="h-full w-full max-w-7xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-border shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="text-lg sm:text-2xl font-black text-primary truncate">{viewNotice.title}</h2>
                <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">{viewNotice.body}</p>
              </div>
              <button
                onClick={() => setViewNotice(null)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X size={26} />
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-hidden">
              {viewNotice.attachment ? (
                <>
                  {viewNotice.attachment.type === 'application/pdf' && (
                    <iframe
                      src={viewNotice.attachment.url}
                      className="w-full h-full border-0"
                      title="PDF Viewer"
                    />
                  )}
                  {viewNotice.attachment.type.startsWith('image/') && (
                    <div className="w-full h-full flex items-center justify-center bg-muted p-4 overflow-auto">
                      <img
                        src={viewNotice.attachment.url}
                        alt="attachment"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-muted-foreground text-sm text-center border-2 border-dashed border-border rounded-xl bg-accent/20 px-8 py-12">
                    <AlertCircle size={32} className="mx-auto mb-3 opacity-40" />
                    No attachment available
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
