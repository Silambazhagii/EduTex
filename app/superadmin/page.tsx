import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CheckCircle, XCircle, Clock, ShieldAlert, LogOut } from "lucide-react";
import { approveHod, rejectHod } from "@/app/actions/superadmin";

export default async function SuperadminDashboard() {
    const session = await auth();

    if (!session || session.user.role !== "SUPERADMIN") {
        redirect("/login");
    }

    const applications = await prisma.user.findMany({
        where: { role: "HOD" },
        orderBy: { createdAt: "desc" },
    });

    const pendingCount = applications.filter((a) => a.status === "Pending").length;

    return (
        <div className="min-h-screen bg-background text-foreground dotgrid p-4 sm:p-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between bg-card/80 backdrop-blur-xl border border-border p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg">
                            <ShieldAlert className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">Superadmin Portal</h1>
                            <p className="text-muted-foreground text-sm font-semibold mt-0.5">Manage Platform Access & HODs</p>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex gap-4 items-center">
                        <div className="bg-accent px-4 py-2 rounded-xl border border-border flex gap-2 items-center text-sm font-black">
                            <Clock className="w-4 h-4 text-primary" />
                            {pendingCount} Pending Applications
                        </div>
                        <form action="/api/auth/signout" method="POST">
                            <button className="flex items-center gap-2 text-sm font-bold text-destructive hover:bg-destructive/10 px-4 py-2 rounded-xl transition-colors">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* Applications List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((app) => (
                        <div key={app.id} className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-1 ${app.status === "Approved" ? "bg-primary" :
                                    app.status === "Rejected" ? "bg-destructive" : "bg-accent"
                                }`} />

                            <div className="flex justify-between items-start mb-4 gap-2">
                                <div>
                                    <h3 className="font-black text-lg text-foreground truncate max-w-[200px]" title={app.name}>{app.name}</h3>
                                    <p className="text-xs text-muted-foreground font-semibold uppercase">{app.role}</p>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${app.status === "Approved" ? "bg-primary/10 text-primary border-primary/20" :
                                        app.status === "Rejected" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-accent text-foreground border-border"
                                    }`}>
                                    {app.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-6 flex-1 text-sm font-medium">
                                <div className="flex justify-between bg-accent/30 p-2 rounded-lg">
                                    <span className="text-muted-foreground text-xs">Email</span>
                                    <span className="truncate max-w-[150px]" title={app.email!}>{app.email}</span>
                                </div>
                                <div className="flex justify-between bg-accent/30 p-2 rounded-lg">
                                    <span className="text-muted-foreground text-xs">College</span>
                                    <span className="truncate max-w-[150px]" title={app.collegeName!}>{app.collegeName}</span>
                                </div>
                                <div className="flex justify-between bg-accent/30 p-2 rounded-lg">
                                    <span className="text-muted-foreground text-xs">Dept</span>
                                    <span className="truncate max-w-[150px]" title={app.department!}>{app.department}</span>
                                </div>
                                <div className="flex justify-between bg-accent/30 p-2 rounded-lg mt-1">
                                    <span className="text-muted-foreground text-xs">Joined</span>
                                    <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {app.status === "Pending" ? (
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <form action={approveHod.bind(null, app.id)}>
                                        <button className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-xl text-sm transition-all">
                                            <CheckCircle className="w-4 h-4" /> Approve
                                        </button>
                                    </form>
                                    <form action={rejectHod.bind(null, app.id)}>
                                        <button className="w-full flex items-center justify-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 font-bold py-2.5 rounded-xl text-sm transition-all">
                                            <XCircle className="w-4 h-4" /> Reject
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className={`mt-auto text-center text-xs font-bold py-3 rounded-xl border border-dashed ${app.status === "Approved" ? "bg-primary/5 text-primary border-primary/20" : "bg-destructive/5 text-destructive border-destructive/20"
                                    }`}>
                                    {app.status === "Approved" ? "Access Granted" : "Application Denied"}
                                </div>
                            )}
                        </div>
                    ))}

                    {applications.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-border rounded-3xl">
                            <ShieldAlert className="w-12 h-12 mb-4" />
                            <h2 className="text-xl font-bold">No HOD Applications</h2>
                            <p className="text-sm font-medium mt-1">When users apply for HOD access, they will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
