"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoaderFour } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      if(data.message && data.message === "success"){
        location.replace("/")
      }
      else{
        toast.error("Login Failed",{
          description:data.error,    
        })
      }
      
      // location.href = "/dashboard"; // optional
    } catch (err: any) {
      setError(err.message);
       toast.error("Login Failed",{
          description:"Website not connected to server",    
        })
    } finally {
      setTimeout(() => {
        
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome Back
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Please login to continue using <strong>Hi Quizz</strong>
        </p>

        <form className="my-8" onSubmit={handleLogin}>
          <LabelInputContainer className="mb-4">
            <Label className={""} htmlFor="email">Email Address</Label>
            <Input className={""} id="email" name="email" placeholder="yourname@example.com" type="email" required />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label className={""} htmlFor="password">Password</Label>
            <Input className={""} id="password" name="password" placeholder="••••••••" type="password" required />
          </LabelInputContainer>

          {/* {error && <p className="text-sm text-red-500 mb-4">{error}</p>} */}

          <button
            type="submit"
            disabled={loading}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          >
            {loading ? <LoaderFour /> : "Login →"}
            <BottomGradient />
          </button>

          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
