"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
    const parms = useSearchParams()
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md">
          {parms.get("msg")}
        </p>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => router.back()}>
            Retry
          </Button>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
      </div>
    </div>
  );
}
