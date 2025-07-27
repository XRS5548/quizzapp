"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lightbulb, BookOpenCheck, Users, Rocket } from "lucide-react"
import ABOUTSECTION from "@/components/personal/About"

export default function AboutPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10 mt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">About HiQuizz</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Level up your knowledge with interactive quizzes!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className={""}>
          <CardHeader className={""}>
            <Lightbulb className="w-10 h-10 text-yellow-500" />
            <CardTitle className={""}>Why HiQuizz?</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <p className="text-muted-foreground">
              HiQuizz helps users test and improve their knowledge through fun,
              engaging quizzes across various topics.
            </p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className={""}>
            <BookOpenCheck className="w-10 h-10 text-green-500" />
            <CardTitle className={""}>Learn by Doing</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <p className="text-muted-foreground">
              Practice makes perfect! Attempt quizzes, track your progress,
              and learn from your mistakes in real-time.
            </p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className={""}>
            <Users className="w-10 h-10 text-blue-500" />
            <CardTitle className={""}>Community-Driven</CardTitle>
          </CardHeader >
          <CardContent className={""}>
            <p className="text-muted-foreground">
              Create, share, and solve quizzes created by other learners. HiQuizz
              is powered by a growing community of curious minds.
            </p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className={""}>
            <Rocket className="w-10 h-10 text-purple-500" />
            <CardTitle className={""}>Fast & Fun</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <p className="text-muted-foreground">
              Designed for speed and simplicity, HiQuizz lets you jump into
              action with minimal setup and maximum fun.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-10">
        <p className="text-muted-foreground">
          Whether you are a student, teacher, or trivia lover — HiQuizz is your
          go-to place to learn, test, and grow 🚀
        </p>
      </div>

      <ABOUTSECTION />
    </main>
  )
}
