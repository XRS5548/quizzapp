import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Vortex } from "@/components/ui/vortex";
import { Navbar1 } from "@/components/personal/Navbar";
import HeroSection from "@/components/personal/Hero";
import Header from "@/components/personal/Header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { connection } from "next/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hi Quizz",
  description: "A online Quizz app",
};

export default async function RootLayout({ children }) {

  // connection()
  let cookie = await cookies()
  let fname = cookie.get("fname")?.value
  console.log(fname)
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <NextTopLoader color="#fff" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
         <Header fname={fname} />


          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
