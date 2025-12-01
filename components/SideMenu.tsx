'use client'

import React, { FC, useRef, useEffect } from 'react'
import Logo from './Logo'
import { X } from 'lucide-react'
import { headerData } from '@/constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SocialMedia from './SocialMedia'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  // Only render if isOpen = true
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50" />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 z-50 h-screen w-72 bg-black text-white p-10 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Logo className="text-white" />
          <button onClick={onClose} className="hover:text-shop_light_green">
            <X />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4">
          {headerData.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`text-white font-semibold hover:text-shop_light_green`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Social Media */}
        <div className="mt-auto pt-10">
          <SocialMedia />
        </div>
      </div>
    </>
  )
}

export default SideMenu
