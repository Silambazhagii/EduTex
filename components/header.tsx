import { Bell, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="h-14 flex items-center justify-between px-3 md:px-6">
      <Image src={"/logo.png"} height={200} width={200} alt='Logo edutex'  />
      <div className="flex items-center gap-x-6">
        <Button size='icon' variant='ghost'>
          <Search size={20} className='text-accent-foreground' />
        </Button>
        <Button size='icon' variant='ghost'>
          <Bell size={20} className='text-accent-foreground' />
        </Button>
      </div>
    </div>
  )
}
