// app/page.tsx - EduTex Admin: Working Shortcuts with Navigation
'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  body: string;
  date: string;
  attachment?: { name: string; url: string; type: string };
}

export default function EduTexAdminDashboard() {
  const router = useRouter();

  const [notices, setNotices] = useState<Notice[]>([
    {
  id: 1,
  title: 'Robotics Workshop Circular',
  body: 'Its conducted on 20th February 2026, Faculties please share it with your students',
  date: 'Feb 20',
  attachment: {
    name: 'Robotics_Workshop_Circular.pdf',
    url: 'https://drive.google.com/file/d/11SrEjfVbHN88uNUw4q3fH8NhECR9jgVt/view',
    type: 'application/pdf',
  },
},

    { id: 2, title: 'SOP Annual Day 2K26', body: 'New approval workflow is now live from Feb 18.', date: 'Feb 18'},
    { id: 3, title: 'Timetable Update', body: 'Updated timetable published – check your schedule.', date: 'Feb 17' },
    { id: 4, title: 'Exam Duty', body: 'Exam duty assignments published for March 2026.', date: 'Feb 16' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);

  const shortcuts = [
    { label: 'Reschedule', icon: '🔄', route: '/reschedule' },
    { label: 'Timetable',  icon: '📅', route: '/timetable'  },
    { label: 'Attendance', icon: '✅', route: '/attendance' },
    { label: 'Reports',    icon: '📊', route: '/reports'    },
    { label: 'Students',   icon: '👨‍🎓', route: '/students'  },
    { label: 'Room Book',  icon: '🏫', route: '/rooms'      },
  ];

  const handleAddNotice = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    const attachment = newFile
      ? { name: newFile.name, url: URL.createObjectURL(newFile), type: newFile.type }
      : undefined;
    setNotices([
      {
        id: Date.now(),
        title: newTitle,
        body: newBody,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        attachment,
      },
      ...notices,
    ]);
    setNewTitle('');
    setNewBody('');
    setNewFile(null);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background p-4 sm:p-6 lg:p-8 font-sans">

      {/* ── Header ── */}
<header className="mb-8 sm:mb-10 p-4 sm:p-6 lg:p-8 bg-card/80 backdrop-blur-xl border-4 border-dashed border-border rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="text-center sm:text-left">

      {/* ← ONLY THIS LINE CHANGED */}
      <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-primary">
        ADMIN CONTROLS
      </h1>

      <p className="text-sm sm:text-base text-muted-foreground mt-1">Dr. Rakesh Shetty · HOD of Computer Science</p>
    </div>
    <div className="flex items-center justify-center sm:justify-end gap-3">
      <span className="text-xs sm:text-sm text-muted-foreground hidden md:block">Welcome Back!</span>
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-sm sm:text-base shadow-lg">RS</div>
    </div>
  </div>
</header>


      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* ── LEFT: Faculty Requests ── */}
        <section className="lg:col-span-2 order-1">
          <div className="card h-full">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary mb-6 pb-4 border-b-2 border-dashed border-border">👨‍🏫 Faculty Requests</h2>
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
              {[
                { name: 'Prof. Priya Sharma', type: 'Leave Request',    status: 'Pending',  date: 'Feb 20 · 10:30 AM', desc: '3 days medical leave for family emergency', statusColor: 'bg-accent text-accent-foreground border-border' },
                { name: 'Dr. Rahul Mehta',    type: 'Class Reschedule', status: 'Approved', date: 'Feb 19 · 2:15 PM',  desc: 'Lab session moved to next Monday',          statusColor: 'bg-primary/10 text-primary border-primary/30' },
                { name: 'Ms. Anjali Rao',     type: 'Resource Request', status: 'Rejected', date: 'Feb 18 · 9:00 AM',  desc: 'Projector for seminar hall – Feb 22',       statusColor: 'bg-destructive/10 text-destructive border-destructive/20' },
              ].map((req, i) => (
                <div key={i} className="tile hover:border-primary/50 hover:shadow-lg transition-all duration-200 group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">{req.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold self-start whitespace-nowrap border ${req.statusColor}`}>{req.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold border border-primary/20">{req.type}</span>
                    <span className="text-xs text-muted-foreground self-center">{req.date}</span>
                  </div>
                  <p className="text-foreground/80 text-sm mb-4 leading-relaxed">{req.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {req.status === 'Pending' && (
                      <>
                        <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md">✅ Approve</button>
                        <button className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">👁️ View</button>
                        <button className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive py-3 px-4 rounded-xl font-semibold text-sm transition-all border border-destructive/20">✕ Reject</button>
                      </>
                    )}
                    {req.status === 'Approved' && (
                      <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md">📄 Print Notice</button>
                    )}
                    {req.status === 'Rejected' && (
                      <button className="flex-1 bg-secondary hover:bg-muted text-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">👁️ View Details</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RIGHT: Notices + Shortcuts ── */}
        <div className="lg:col-span-1 order-2 flex flex-col gap-6">

          {/* ── NOTICES ── */}
          <section className="card flex-1">
            <div className="flex justify-between items-center mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-black text-primary">📢 Notices</h3>
              <button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap">
                + Add Notice
              </button>
            </div>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
              {notices.map((n) => (
                <div key={n.id} onClick={() => setViewNotice(n)} className="p-4 bg-accent/60 rounded-xl border-l-4 border-primary hover:bg-accent cursor-pointer transition-all text-sm text-foreground group">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold group-hover:text-primary transition-colors">{n.title}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {n.attachment && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">📎</span>}
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{n.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SHORTCUTS ── */}
          <section className="card">
            <h3 className="text-xl sm:text-2xl font-black text-primary mb-5 pb-3 border-b-2 border-dashed border-border">🚀 Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3">
              {shortcuts.map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.route)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 sm:py-4 px-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 flex flex-col items-center gap-1"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Stats Footer ── */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {[
          { num: notices.length.toString(), label: 'Notices',        icon: '📢' },
          { num: '4',                       label: 'Pending',        icon: '⏳' },
          { num: '12',                      label: 'Approved',       icon: '✅' },
          { num: '24',                      label: 'Faculty Online', icon: '👥' },
        ].map((stat, i) => (
          <div key={i} className="tile text-center hover:scale-[1.03] hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-default">
            <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-black text-primary">{stat.num}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ════ ADD NOTICE MODAL ════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <div className="bg-card border-2 border-border rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-primary">📢 Add New Notice</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground text-2xl font-bold">✕</button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">Notice Title *</label>
              <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Workshop Rescheduled" className="w-full p-3 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">Notice Details *</label>
              <textarea value={newBody} onChange={e => setNewBody(e.target.value)} placeholder="Write the full notice content here..." rows={4} className="w-full p-3 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">Attachment (PDF / Image)</label>
              <div onClick={() => fileRef.current?.click()} className="w-full p-4 bg-background border-2 border-dashed border-border rounded-xl text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition-all group">
                {newFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-2xl">📎</span>
                    <span className="font-semibold text-sm">{newFile.name}</span>
                    <button onClick={e => { e.stopPropagation(); setNewFile(null); }} className="text-destructive ml-2 font-bold">✕</button>
                  </div>
                ) : (
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <div className="text-3xl mb-1">📁</div>
                    <div className="text-sm font-medium">Click to upload PDF or Image</div>
                    <div className="text-xs mt-1">PDF, PNG, JPG supported</div>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={e => setNewFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground py-3 rounded-xl font-semibold transition-all">Cancel</button>
              <button onClick={handleAddNotice} disabled={!newTitle || !newBody} className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground py-3 rounded-xl font-bold transition-all shadow-md">Post Notice</button>
            </div>
          </div>
        </div>
      )}

      {/* ════ VIEW NOTICE MODAL ════ */}
      {viewNotice && (
        <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-2 sm:p-4" onClick={() => setViewNotice(null)}>
          <div className="h-full w-full max-w-7xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-border shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="text-lg sm:text-2xl font-black text-primary truncate">{viewNotice.title}</h2>
                <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">{viewNotice.body}</p>
              </div>
              <button onClick={() => setViewNotice(null)} className="text-muted-foreground hover:text-foreground text-2xl sm:text-3xl font-bold transition-colors shrink-0">✕</button>
            </div>
            <div className="flex-1 overflow-hidden">
              {viewNotice.attachment ? (
                <>
                  {viewNotice.attachment.type === 'application/pdf' && (
                    <iframe src={viewNotice.attachment.url} className="w-full h-full border-0" title="PDF Viewer" />
                  )}
                  {viewNotice.attachment.type.startsWith('image/') && (
                    <div className="w-full h-full flex items-center justify-center bg-muted p-4 overflow-auto">
                      <img src={viewNotice.attachment.url} alt="attachment" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-sm text-center border-2 border-dashed border-border rounded-xl bg-accent/20 px-8 py-12">No attachment available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
