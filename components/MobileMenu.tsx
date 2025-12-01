"use client"
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideMenu from './SideMenu'

const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button onClick={() => setIsSidebarOpen(true)}>
                <AlignLeft className='hover:text-darkColor hoverEffect md:hidden cursor-pointer'/>
            </button>

            {/* SideMenu directly, no wrapper div */}
            <SideMenu 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
        </>
    )
}

export default MobileMenu
