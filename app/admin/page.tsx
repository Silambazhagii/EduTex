// app/page.tsx - EduTex Admin: Notices TOP-RIGHT, Shortcuts BELOW, globals.css theme
'use client';

export default function EduTexAdminDashboard() {
  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background p-4 sm:p-6 lg:p-8 font-sans">

      {/* ── Header ── */}
      <header className="mb-8 sm:mb-10 p-4 sm:p-6 lg:p-8 bg-card/80 backdrop-blur-xl border-4 border-dashed border-border rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
              EduTex Admin Portal
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Dr. Rakesh Shetty · HOD of Computer Science
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <span className="text-xs sm:text-sm text-muted-foreground hidden md:block">Welcome, Admin!</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-sm sm:text-base shadow-lg">
              RS
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* ── LEFT: Faculty Requests (spans 2 cols on desktop) ── */}
        <section className="lg:col-span-2 order-1">
          <div className="card h-full">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary mb-6 pb-4 border-b-2 border-dashed border-border">
              👨‍🏫 Faculty Requests
            </h2>

            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">

              {/* Card 1 – Pending */}
              <div className="tile hover:border-primary/50 hover:shadow-lg transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                    Prof. Priya Sharma
                  </h3>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold self-start whitespace-nowrap border border-border">
                    ⏳ Pending
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold border border-primary/20">
                    Leave Request
                  </span>
                  <span className="text-xs text-muted-foreground self-center">Feb 20 · 10:30 AM</span>
                </div>
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                  3 days medical leave for family emergency
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg">
                    ✅ Approve
                  </button>
                  <button className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">
                    👁️ View Details
                  </button>
                  <button className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive py-3 px-4 rounded-xl font-semibold text-sm transition-all border border-destructive/20">
                    ✕ Reject
                  </button>
                </div>
              </div>

              {/* Card 2 – Approved */}
              <div className="tile border-primary/20 bg-gradient-to-r from-card to-accent/20 hover:shadow-lg transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                    Dr. Rahul Mehta
                  </h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold self-start whitespace-nowrap border border-primary/30">
                    ✅ Approved
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-xl text-xs font-semibold border border-border">
                    Class Reschedule
                  </span>
                  <span className="text-xs text-muted-foreground self-center">Feb 19 · 2:15 PM</span>
                </div>
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                  Lab session moved to next Monday
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 bg-muted text-muted-foreground py-3 px-4 rounded-xl font-semibold text-sm opacity-60 cursor-not-allowed" disabled>
                    ✓ Completed
                  </button>
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md">
                    📄 Print Notice
                  </button>
                </div>
              </div>

              {/* Card 3 – Rejected */}
              <div className="tile border-destructive/20 hover:shadow-lg transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-destructive transition-colors">
                    Ms. Anjali Rao
                  </h3>
                  <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-bold self-start whitespace-nowrap border border-destructive/20">
                    ✕ Rejected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-xl text-xs font-semibold border border-border">
                    Resource Request
                  </span>
                  <span className="text-xs text-muted-foreground self-center">Feb 18 · 9:00 AM</span>
                </div>
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
                  Projector for seminar hall – Feb 22
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-secondary hover:bg-muted text-foreground py-3 px-4 rounded-xl font-semibold text-sm transition-all">
                    👁️ View Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── RIGHT: Notices (TOP) + Shortcuts (BOTTOM) ── */}
        <div className="lg:col-span-1 order-2 flex flex-col gap-6">

          {/* ── NOTICES – TOP RIGHT ── */}
          <section className="card flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-black text-primary">📢 Notices</h3>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap">
                + Add Notice
              </button>
            </div>
            <div className="space-y-3 max-h-48 lg:max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
              <div className="p-4 bg-accent/60 rounded-xl border-l-4 border-primary hover:bg-accent cursor-pointer transition-all text-sm text-foreground">
                <span className="font-semibold">Workshop Day 3</span> rescheduled to Feb 25
              </div>
              <div className="p-4 bg-secondary rounded-xl border-l-4 border-primary/60 hover:bg-muted cursor-pointer transition-all text-sm text-foreground">
                <span className="font-semibold">Leave policy</span> – new approval workflow live
              </div>
              <div className="p-4 bg-accent/40 rounded-xl border-l-4 border-primary/40 hover:bg-accent cursor-pointer transition-all text-sm text-foreground">
                <span className="font-semibold">Timetable</span> updated – check your schedule
              </div>
              <div className="p-4 bg-secondary rounded-xl border-l-4 border-border hover:bg-muted cursor-pointer transition-all text-sm text-foreground">
                <span className="font-semibold">Exam duty</span> assignments published
              </div>
            </div>
          </section>

          {/* ── SHORTCUTS – BELOW NOTICES ── */}
          <section className="card">
            <h3 className="text-xl sm:text-2xl font-black text-primary mb-5 pb-3 border-b-2 border-dashed border-border">
              🚀 Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Reschedule', icon: '🔄' },
                { label: 'Timetable', icon: '📅' },
                { label: 'Attendance', icon: '✅' },
                { label: 'Reports', icon: '📊' },
                { label: 'Students', icon: '👨‍🎓' },
                { label: 'Room Book', icon: '🏫' },
              ].map((item, i) => (
                <button
                  key={i}
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
          { num: '4', label: 'Pending', icon: '⏳' },
          { num: '12', label: 'Approved', icon: '✅' },
          { num: '3', label: 'Notices', icon: '📢' },
          { num: '24', label: 'Faculty Online', icon: '👥' },
        ].map((stat, i) => (
          <div key={i} className="tile text-center hover:scale-[1.03] hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-default">
            <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-black text-primary">{stat.num}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
