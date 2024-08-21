'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const AdminLinks = ({name, url, active}: {name: string; url: string, active?: boolean}) => {
  const pathname = usePathname();
  const changeBg = pathname === url 
  return (
    <Link href={url} className={cn(` w-full py-4 px-4`, {"bg-white text-black": changeBg})}>{name}</Link>
  );
}

export default AdminLinks