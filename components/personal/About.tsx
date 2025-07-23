"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  ArrowUpRightIcon,
  Globe,
  Heart,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CompanyValue = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  principles: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  image?: string;
};

// Quiz-oriented values
const companyValues: CompanyValue[] = [
  {
    id: "innovation",
    name: "Creative Learning",
    description:
      "We believe in transforming quizzes into fun, engaging, and innovative learning experiences that challenge and inspire.",
    icon: Lightbulb,
    color: "text-yellow-500",
    principles: [
      "Gamify learning for deeper understanding",
      "Encourage creativity in question design",
      "Blend education with excitement",
      "Iterate fast based on feedback",
    ],
    testimonial: {
      quote:
        "HiQuizz turned boring study sessions into something I look forward to. It’s like playing a game, but you're actually learning.",
      author: "Riya Sharma",
      role: "Medical Student",
      image:
        "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    image:
      "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "integrity",
    name: "Fair Challenges",
    description:
      "Our quizzes are crafted with care, clarity, and fairness—helping learners trust the content they engage with.",
    icon: ShieldCheck,
    color: "text-blue-600",
    principles: [
      "Avoid trick questions and ambiguity",
      "Provide transparent answer logic",
      "Respect time and effort of learners",
      "Keep academic honesty at the core",
    ],
    testimonial: {
      quote:
        "The way answers are explained helps me truly understand, not just memorize. That’s the integrity I value.",
      author: "Pranav Desai",
      role: "Engineering Aspirant",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
  },
  {
    id: "collaboration",
    name: "Community Driven",
    description:
      "We empower creators, educators, and learners to build and share quizzes that elevate everyone’s learning experience.",
    icon: Users,
    color: "text-indigo-500",
    principles: [
      "Let users create and contribute quizzes",
      "Encourage quiz feedback and suggestions",
      "Celebrate top quiz creators",
      "Build features users actually want",
    ],
    testimonial: {
      quote:
        "I created my own quiz and shared it with my classmates—it felt awesome seeing everyone enjoy it and learn together!",
      author: "Ananya Raj",
      role: "Quiz Creator",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1623241461978-668ede250064?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "excellence",
    name: "Quality First",
    description:
      "We aim for accuracy, relevance, and excellence in every quiz—because your time and learning matter.",
    icon: AreaChart,
    color: "text-green-600",
    principles: [
      "Craft high-quality, verified questions",
      "Design intuitive and beautiful interfaces",
      "Focus on user performance & progress",
      "Continuously improve based on feedback",
    ],
    testimonial: {
      quote:
        "Unlike many other platforms, HiQuizz feels polished and focused. I can track my progress and keep improving.",
      author: "Dev Malik",
      role: "CAT Aspirant",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
  },
];

export default function ABOUTSECTION() {
  const [activeValue, setActiveValue] = useState<string>(companyValues[0].id);
  const currentValue =
    companyValues.find((value) => value.id === activeValue) || companyValues[0];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            About HiQuizz
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why HiQuizz Exists
          </h2>
          <p className="text-muted-foreground">
            HiQuizz is not just another quiz platform. We are here to make
            learning exciting, fair, and empowering for everyone—students,
            educators, and creators alike.
          </p>
        </div>

        <Tabs
          value={activeValue}
          onValueChange={setActiveValue}
          className="space-y-8"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-full md:hidden">
              <Select value={activeValue} onValueChange={setActiveValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a core value" />
                </SelectTrigger>
                <SelectContent className={""}>
                  {companyValues.map((value) => (
                    <SelectItem className={""} key={value.id} value={value.id}>
                      <div className="flex items-center gap-2">
                        <value.icon className={cn("h-4 w-4", value.color)} />
                        <span>{value.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <TabsList className="hidden h-auto bg-transparent p-1 md:flex">
              {companyValues.map((value) => (
                <TabsTrigger
                  key={value.id}
                  value={value.id}
                  className={cn(
                    "data-[state=active]:bg-muted gap-2",
                    "data-[state=active]:border-border border border-transparent"
                  )}
                >
                  <value.icon className={cn("h-4 w-4", value.color)} />
                  <span>{value.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="space-y-6 md:col-span-6">
              <div className="mb-4 flex items-center gap-4">
                <div className={cn("rounded-xl p-2.5", "bg-muted")}>
                  <currentValue.icon
                    className={cn("h-7 w-7", currentValue.color)}
                  />
                </div>
                <h3 className="text-2xl font-bold">{currentValue.name}</h3>
              </div>

              <p className="text-muted-foreground text-lg">
                {currentValue.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-medium">How We Do It:</h4>
                <ul className="space-y-2">
                  {currentValue.principles.map((principle, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowUpRightIcon
                        className={cn("mt-0.5 h-5 w-5", currentValue.color)}
                      />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentValue.testimonial && (
                <Card className="bg-muted/30 mt-6 p-0">
                  <CardContent className="p-6">
                    <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={currentValue.testimonial.image}
                          alt={currentValue.testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {currentValue.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {currentValue.testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      &quot;{currentValue.testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-6">
              {currentValue.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={currentValue.image}
                    alt={`Illustration of ${currentValue.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div className="inline-block rounded-lg px-3 py-1 text-sm text-white bg-black/30 backdrop-blur-sm">
                      {currentValue.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted flex aspect-[4/3] items-center justify-center rounded-xl">
                  <currentValue.icon
                    className={cn("h-24 w-24", currentValue.color, "opacity-25")}
                  />
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Ready to discover a smarter, more fun way to learn?
          </p>
          <Button className={""} variant="default" size="lg" asChild>
            <Link href="/quizs">Start Your Quiz Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
