"use client"
import React from 'react'
import { Vortex } from '../ui/vortex'
import { Navbar1 } from './Navbar'
import HeroSection from './Hero'
import { usePathname } from 'next/navigation'
import { Navbar2 } from './Navbar2'

export default function Header() {
    let pathname = usePathname()
    return (
        <>
                    <Navbar2  />

            {pathname == '/' &&
                <Vortex backgroundColor="black" particleCount={800} >
                    {/* <Navbar1 /> */}

                    <HeroSection />
                </Vortex>
               
            }
        </>
    )
}
