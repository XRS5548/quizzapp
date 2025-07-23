"use client"

import {LoaderThree } from "@/components/ui/loader";




export default function page() {
    setTimeout(() => {
        location.replace("/user/dashboard") 
        
    }, 5000);
  return (
    <main className="flex justify-center items-center min-h-screen">
        <LoaderThree />
    </main>
  )
}
