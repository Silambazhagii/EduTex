// components/headers/AdminHeader.tsx
import { Bell, Search, ChevronDown, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

export default function AdminHeader() {
  return (
    <div className="h-16 flex items-center justify-between px-4 md:px-8 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">

      <Image src="/logo.png" height={200} width={300} alt="EduTex Logo" className="object-contain" />

      {/* Admin Badge next to logo */}
      <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold">
        <ShieldCheck size={12} />
        Admin
      </span>

      <div className="hidden md:flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2 w-72 lg:w-96 group focus-within:border-primary transition-colors">
        <Search size={15} className="text-muted-foreground group-focus-within:text-primary transition-colors shrink-0" />
        <input type="text" placeholder="Search students, faculty, notices..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-full" />
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" className="md:hidden">
          <Search size={18} className="text-accent-foreground" />
        </Button>
        <div className="relative">
          <Button size="icon" variant="ghost">
            <Bell size={18} className="text-accent-foreground" />
          </Button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
        </div>
        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
        <button className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-accent transition-colors group">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xs shrink-0">RS</div>
          <div className="text-left hidden lg:block">
            <p className="text-xs font-bold text-foreground leading-tight">Dr. Rakesh Shetty</p>
            <p className="text-[10px] text-muted-foreground leading-tight">HOD · Admin</p>
          </div>
          <ChevronDown size={13} className="text-muted-foreground group-hover:text-foreground transition-colors hidden lg:block" />
        </button>
      </div>

    </div>
  )
}
