import { Bell, Search, ChevronDown, User, LogOut } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default async function Header() {
  const session = await auth();

  return (
    <div className="h-16 flex items-center justify-between px-4 md:px-8 bg-card/80 backdrop-blur-xl border-b border-border sticky top-2 z-40">

      {/* ── Left: Logo ── */}
      <Link href="/">
        <Image
          src="/logo.png"
          height={200}
          width={300}
          alt="EduTex Logo"
          className="object-contain"
          priority
        />
      </Link>

      {/* ── Center: Search Bar ── */}
      <div className="hidden md:flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2 w-72 lg:w-96 group focus-within:border-primary transition-colors">
        <Search size={15} className="text-muted-foreground group-focus-within:text-primary transition-colors shrink-0" />
        <input
          type="text"
          placeholder="Search students, faculty, notices..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
        />
      </div>

      {/* ── Right: Actions + Profile ── */}
      <div className="flex items-center gap-2">

        {/* Mobile Search */}
        <Button size="icon" variant="ghost" className="md:hidden">
          <Search size={18} className="text-accent-foreground" />
        </Button>

        {session ? (
          <>
            {/* Notifications */}
            <div className="relative">
              <Button size="icon" variant="ghost" className="relative">
                <Bell size={18} className="text-accent-foreground" />
              </Button>
              {/* Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

            {/* Profile Chip */}
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-accent transition-colors group">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xs shrink-0 uppercase">
                      {session.user?.name?.substring(0, 2) || "U"}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-foreground leading-tight">{session.user?.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{(session.user as any)?.role}</p>
                    </div>
                    <ChevronDown size={13} className="text-muted-foreground group-hover:text-foreground transition-colors hidden lg:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={async () => {
                      "use server";
                      await signOut();
                    }} className="w-full">
                      <button type="submit" className="w-full flex items-center text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Personal Profile</DialogTitle>
                  <DialogDescription>
                    View your personal information and account status.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <div className="w-20 h-20 bg-primary/10 border-4 border-primary/20 rounded-full flex items-center justify-center text-primary font-black text-3xl uppercase">
                      {session.user?.name?.substring(0, 2) || "U"}
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl">{session.user?.name}</h3>
                      <p className="text-sm font-semibold text-primary">{(session.user as any)?.role}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl space-y-3">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-semibold text-sm text-right text-muted-foreground">Email</span>
                      <span className="col-span-3 text-sm font-medium">{session.user?.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-semibold text-sm text-right text-muted-foreground">ID / USN</span>
                      <span className="col-span-3 text-sm font-medium uppercase">{(session.user as any)?.usn || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="font-semibold text-sm text-right text-muted-foreground">Status</span>
                      <span className="col-span-3 text-sm font-medium">
                        <span className="px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-600 text-xs font-bold dark:bg-green-500/20 dark:text-green-400">
                          {(session.user as any)?.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}

      </div>
    </div>
  )
}
