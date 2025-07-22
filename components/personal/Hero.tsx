import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextRevealCard } from "../ui/text-reveal-card";

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}

      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              🚀 New Feature Launched
              <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Title */}
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              <TextRevealCard
                
                className="bg-transparent"
                text="Create, Share & Analyze Quizzes Instantly"
                revealText="I know the chemistry "
              />
            </h1>
          </div>

          {/* Description */}
          <div className="mx-auto mt-6 max-w-3xl text-center text-xl ">
            <TextGenerateEffect filter={true} words="Build interactive quizzes in seconds. Whether you're a teacher, recruiter, or content creator — engage your audience and track their performance in real time." />
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/quizs">
              <Button className={""} variant='default' size="lg">Get Started</Button>
            </Link>
            <Link href="/user/create-qizz">
              <Button className={""} size="lg" variant="outline">
                Create New Quiz
              </Button>
            </Link>
          </div>

          {/* Package Info (optional) */}
          <div className="mt-8 flex items-center justify-center gap-x-1 sm:gap-x-3">
            <span className=" text-sm">Built with:</span>
            <span className="text-sm font-bold">Next.js & Shadcn UI</span>
            <svg
              className=" h-5 w-5"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
              href="#"
            >
              View Docs
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
