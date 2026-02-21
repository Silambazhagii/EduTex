// app/page.tsx - EduTex Admin: Full Reactive Dashboard
'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell, FileText, Users, Calendar, ClipboardCheck,
  BarChart2, BookOpen, DoorOpen, RefreshCw, Paperclip,
  Plus, Eye, X, CheckCircle, XCircle, Clock, Upload,
  AlertCircle, ChevronRight, Lock
} from 'lucide-react';
import { getPendingDocuments, reviewDocument } from '@/app/actions/upload';

interface Notice {
  id: number;
  title: string;
  body: string;
  date: string;
  attachment?: { name: string; url: string; type: string };
}

interface FacultyRequest {
  id: number;
  name: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  desc: string;
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
        url: 'https://drive.google.com/file/d/11SrEjfVbHN88uNUw4q3fH8NhECR9jgVt/preview',
        type: 'application/pdf',
      },
    }
  ]);

  const [requests, setRequests] = useState<FacultyRequest[]>([
    { id: 1, name: 'Prof. Priya Sharma', type: 'Leave Request', status: 'Pending', date: 'Feb 20 · 10:30 AM', desc: '3 days medical leave for family emergency' },
  ]);

  const [uploads, setUploads] = useState<any[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(true);

  // Fetch Pending Documents
  useEffect(() => {
    const fetchUploads = async () => {
      setLoadingUploads(true);
      try {
        const pendingDocs = await getPendingDocuments();
        setUploads(pendingDocs);
      } catch (err) {
        console.error("Failed to fetch pending uploads:", err);
      } finally {
        setLoadingUploads(false);
      }
    };
    fetchUploads();
  }, []);

  const [activeTab, setActiveTab] = useState<'requests' | 'uploads'>('requests');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);
  const [viewUpload, setViewUpload] = useState<any | null>(null);

  const shortcuts = [
    { label: 'Add Faculty', icon: <Users size={18} />, action: () => setShowFacultyModal(true) },
    { label: 'Reschedule', icon: <RefreshCw size={18} />, route: '/reschedule' },
    { label: 'Timetable', icon: <Calendar size={18} />, route: '/timetable' },
    { label: 'Attendance', icon: <ClipboardCheck size={18} />, route: '/attendance' },
    { label: 'Reports', icon: <BarChart2 size={18} />, route: '/reports' },
    { label: 'Room Book', icon: <DoorOpen size={18} />, route: '/rooms' },
  ];

  const handleRequestAction = (id: number, action: 'Approved' | 'Rejected') =>
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));

  const handleUploadAction = async (id: string, action: 'Approve' | 'Reject') => {
    try {
      // Optimistic update
      setUploads(prev => prev.map(u => u.id === id ? { ...u, status: action === 'Approve' ? 'Approved' : 'Rejected' } : u));
      await reviewDocument(id, action);
    } catch (e) {
      console.error(e);
      // Fallback: reload fetch
      const pendingDocs = await getPendingDocuments();
      setUploads(pendingDocs);
    }
  };

  const handleAddNotice = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    const attachment = newFile
      ? { name: newFile.name, url: URL.createObjectURL(newFile), type: newFile.type }
      : undefined;
    setNotices([{
      id: Date.now(), title: newTitle, body: newBody,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      attachment,
    }, ...notices]);
    setNewTitle(''); setNewBody(''); setNewFile(null); setShowAddModal(false);
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const pendingUploads = uploads.filter(u => u.status === 'Pending').length;

  const statusStyle = (status: string) =>
    status === 'Approved' ? 'bg-primary/10 text-primary border-primary/30' :
      status === 'Rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
        'bg-accent text-accent-foreground border-border';

  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background p-4 sm:p-6 lg:p-8 font-sans">

      {/* ══════════════════════════════════════
          COMPACT STATS BAR
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-sm">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mr-1">Overview</span>
          <div className="w-px h-4 bg-border mx-1" />
          {[
            { icon: <Bell size={13} />, num: notices.length, label: 'Notices' },
            { icon: <Clock size={13} />, num: requests.filter(r => r.status === 'Pending').length, label: 'Req. Pending' },
            { icon: <CheckCircle size={13} />, num: requests.filter(r => r.status === 'Approved').length, label: 'Req. Approved' },
            { icon: <Upload size={13} />, num: pendingUploads, label: 'Uploads Pending' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-accent/60 border border-border rounded-xl">
              <span className="text-muted-foreground">{stat.icon}</span>
              <span className="text-sm font-black text-primary">{stat.num}</span>
              <span className="text-xs text-muted-foreground font-medium hidden sm:inline">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN GRID
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* ════════════════════════════════════
            LEFT: Tabbed Panel
        ════════════════════════════════════ */}
        <section className="lg:col-span-2 order-1">
          <div className="card h-full">

            {/* ── Tab Bar ── */}
            <div className="flex gap-2 mb-6 pb-4 border-b-2 border-dashed border-border">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'requests'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }`}
              >
                <Users size={14} />
                Faculty Requests
                {pendingRequests > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {pendingRequests}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('uploads')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'uploads'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }`}
              >
                <FileText size={14} />
                Review Uploads
                {pendingUploads > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {pendingUploads}
                  </span>
                )}
              </button>
            </div>

            {/* ── Faculty Requests Tab ── */}
            {activeTab === 'requests' && (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
                {requests.map((req) => (
                  <div key={req.id} className="tile hover:border-primary/50 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">{req.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold self-start whitespace-nowrap border ${statusStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold border border-primary/20">{req.type}</span>
                      <span className="text-xs text-muted-foreground self-center">{req.date}</span>
                    </div>
                    <p className="text-foreground/80 text-sm mb-4 leading-relaxed">{req.desc}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {req.status === 'Pending' && (
                        <>
                          <button onClick={() => handleRequestAction(req.id, 'Approved')} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md">
                            <CheckCircle size={15} /> Approve
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">
                            <Eye size={15} /> View
                          </button>
                          <button onClick={() => handleRequestAction(req.id, 'Rejected')} className="flex-1 flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive py-3 px-4 rounded-xl font-semibold text-sm transition-all border border-destructive/20">
                            <XCircle size={15} /> Reject
                          </button>
                        </>
                      )}
                      {req.status === 'Approved' && (
                        <div className="flex gap-2 flex-1">
                          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
                            <CheckCircle size={15} className="text-primary" />
                            <span className="text-primary text-sm font-semibold">Approved</span>
                          </div>
                          <button onClick={() => handleRequestAction(req.id, 'Rejected')} className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-destructive/20">
                            <X size={13} /> Undo
                          </button>
                        </div>
                      )}
                      {req.status === 'Rejected' && (
                        <div className="flex gap-2 flex-1">
                          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-destructive/5 border border-destructive/20 rounded-xl">
                            <XCircle size={15} className="text-destructive" />
                            <span className="text-destructive text-sm font-semibold">Rejected</span>
                          </div>
                          <button onClick={() => handleRequestAction(req.id, 'Approved')} className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-primary/20">
                            <ChevronRight size={13} /> Undo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Uploads Tab ── */}
            {activeTab === 'uploads' && (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs text-muted-foreground self-center font-semibold">Status:</span>
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-accent border border-border font-semibold">
                    <Clock size={10} /> Pending
                  </span>
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold">
                    <CheckCircle size={10} /> Approved — Visible in search
                  </span>
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 font-semibold">
                    <XCircle size={10} /> Rejected — Hidden
                  </span>
                </div>

                {uploads.map((u) => (
                  <div key={u.id} className="tile hover:border-primary/50 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">{u.studentName}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{u.uploadedAt}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold self-start whitespace-nowrap border ${statusStyle(u.status)}`}>
                        {u.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold border border-primary/20">
                        <BookOpen size={11} /> {u.subject}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-accent rounded-xl text-xs font-semibold border border-border">
                        <Paperclip size={11} /> {u.fileName}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {u.status === 'Pending' && (
                        <>
                          <button onClick={() => handleUploadAction(u.id, 'Approve')} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md">
                            <CheckCircle size={15} /> Approve & Publish
                          </button>
                          <button onClick={() => setViewUpload(u)} className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">
                            <Eye size={15} /> View File
                          </button>
                          <button onClick={() => handleUploadAction(u.id, 'Reject')} className="flex-1 flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive py-3 px-4 rounded-xl font-semibold text-sm transition-all border border-destructive/20">
                            <XCircle size={15} /> Reject
                          </button>
                        </>
                      )}
                      {u.status === 'Approved' && (
                        <div className="flex gap-2 flex-1">
                          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
                            <CheckCircle size={15} className="text-primary shrink-0" />
                            <span className="text-primary text-sm font-semibold">Published — visible in search results</span>
                          </div>
                          <button onClick={() => handleUploadAction(u.id, 'Reject')} className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-destructive/20">
                            <X size={13} /> Undo
                          </button>
                        </div>
                      )}
                      {u.status === 'Rejected' && (
                        <div className="flex gap-2 flex-1">
                          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-destructive/5 border border-destructive/20 rounded-xl">
                            <XCircle size={15} className="text-destructive shrink-0" />
                            <span className="text-destructive text-sm font-semibold">Rejected — not visible to students</span>
                          </div>
                          <button onClick={() => handleUploadAction(u.id, 'Approve')} className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-primary/20">
                            <ChevronRight size={13} /> Undo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ════════════════════════════════════
            RIGHT: Notices + Shortcuts
        ════════════════════════════════════ */}
        <div className="lg:col-span-1 order-2 flex flex-col gap-6">

          {/* ── NOTICES ── */}
          <section className="card flex-1">
            <div className="flex justify-between items-center mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-black text-primary">Notices</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                <Plus size={14} /> Add Notice
              </button>
            </div>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
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
            </div>
          </section>

          {/* ── SHORTCUTS ── */}
          <section className="card">
            <h3 className="text-xl sm:text-2xl font-black text-primary mb-5 pb-3 border-b-2 border-dashed border-border">
              Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {shortcuts.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.route) {
                      router.push(item.route);
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 sm:py-4 px-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 flex flex-col items-center gap-1.5"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ══════════════════════════════════════
          MODAL: Add Notice
      ══════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <div className="bg-card border-2 border-border rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-primary">Add New Notice</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">Notice Title *</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Workshop Rescheduled"
                className="w-full p-3 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-2">Notice Details *</label>
              <textarea
                value={newBody}
                onChange={e => setNewBody(e.target.value)}
                placeholder="Write the full notice content here..."
                rows={4}
                className="w-full p-3 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">Attachment (PDF / Image)</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full p-4 bg-background border-2 border-dashed border-border rounded-xl text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition-all group"
              >
                {newFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Paperclip size={18} />
                    <span className="font-semibold text-sm">{newFile.name}</span>
                    <button
                      onClick={e => { e.stopPropagation(); setNewFile(null); }}
                      className="text-destructive ml-2 font-bold"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <div className="flex justify-center mb-2">
                      <Upload size={28} />
                    </div>
                    <div className="text-sm font-medium">Click to upload PDF or Image</div>
                    <div className="text-xs mt-1">PDF, PNG, JPG supported</div>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={e => setNewFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground py-3 rounded-xl font-semibold transition-all">
                Cancel
              </button>
              <button
                onClick={handleAddNotice}
                disabled={!newTitle || !newBody}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground py-3 rounded-xl font-bold transition-all shadow-md"
              >
                <Bell size={15} /> Post Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MODAL: View Notice
      ══════════════════════════════════════ */}
      {viewNotice && (
        <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-2 sm:p-4" onClick={() => setViewNotice(null)}>
          <div className="h-full w-full max-w-7xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-border shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="text-lg sm:text-2xl font-black text-primary truncate">{viewNotice.title}</h2>
                <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">{viewNotice.body}</p>
              </div>
              <button onClick={() => setViewNotice(null)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <X size={26} />
              </button>
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

      {/* ══════════════════════════════════════
          MODAL: View Upload
      ══════════════════════════════════════ */}
      {viewUpload && (
        <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-2 sm:p-4" onClick={() => setViewUpload(null)}>
          <div className="h-full w-full max-w-7xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-border shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="flex items-center gap-2 text-lg sm:text-2xl font-black text-primary truncate">
                  <Paperclip size={20} /> {viewUpload.fileName}
                </h2>
                <p className="text-xs sm:text-sm text-foreground/80 mt-1">
                  Uploaded by {viewUpload.studentName} · {viewUpload.subject} · {viewUpload.uploadedAt}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { handleUploadAction(viewUpload.id, 'Approve'); setViewUpload(null); }}
                  className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  <CheckCircle size={14} /> Approve
                </button>
                <button
                  onClick={() => { handleUploadAction(viewUpload.id, 'Reject'); setViewUpload(null); }}
                  className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-2 rounded-xl font-bold text-sm border border-destructive/20 transition-all"
                >
                  <XCircle size={14} /> Reject
                </button>
                <button onClick={() => setViewUpload(null)} className="text-muted-foreground hover:text-foreground transition-colors ml-2">
                  <X size={26} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-muted/30">
              <div className="text-muted-foreground text-sm text-center border-2 border-dashed border-border rounded-xl bg-accent/20 px-8 py-12">
                <Lock size={32} className="mx-auto mb-3 opacity-40" />
                File preview requires actual file URL.
                <span className="text-xs mt-1 block">Connect to your storage backend to enable preview.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MODAL: Add Faculty
      ══════════════════════════════════════ */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowFacultyModal(false)}>
          <div className="bg-card border-2 border-border rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-primary flex items-center gap-2">
                <Users size={24} /> Add Faculty
              </h2>
              <button onClick={() => setShowFacultyModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={22} />
              </button>
            </div>

            <form action={async (formData) => {
              const { addFaculty } = await import('@/app/actions/faculty');
              const res = await addFaculty(formData);
              if (res?.success) {
                setShowFacultyModal(false);
                alert("Faculty added successfully!");
              } else {
                alert(res?.error || "Error adding faculty");
              }
            }}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 ml-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Prof. Jenkins"
                    className="w-full p-3 bg-background border-2 border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 ml-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jenkins@college.edu"
                    className="w-full p-3 bg-background border-2 border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 ml-1">Department</label>
                  <input
                    name="department"
                    type="text"
                    required
                    placeholder="Computer Science"
                    className="w-full p-3 bg-background border-2 border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 ml-1">Temporary Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full p-3 bg-background border-2 border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowFacultyModal(false)} className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground py-3 rounded-xl font-semibold transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-bold transition-all shadow-md"
                >
                  <CheckCircle size={15} /> Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
