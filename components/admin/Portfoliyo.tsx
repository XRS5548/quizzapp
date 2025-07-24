"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Trophy } from "lucide-react";

export default function PortfoliyoUser() {
  const user = {
    name: "Rohit Verma",
    bio: "Passionate quiz creator and frontend developer.",
    image: "https://i.pravatar.cc/150?img=5", // Replace with actual image
    totalCreated: 10,
    totalPlays: 150,
    totalWins: 45,
    recentQuizzes: [
      {
        title: "HTML Basics",
        date: "2025-07-20",
        score: "12/15",
        passed: true,
      },
      {
        title: "Linux Commands",
        date: "2025-07-18",
        score: "7/15",
        passed: false,
      },
      {
        title: "Node.js Intro",
        date: "2025-07-17",
        score: "14/15",
        passed: true,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* User Profile */}
      <Card className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 p-4">
        <Avatar className="h-20 w-20">
          <AvatarImage className={""} src={user.image} />
          <AvatarFallback className={""}>RV</AvatarFallback>
        </Avatar>
        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground text-sm">{user.bio}</p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Quizzes Created</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{user.totalCreated}</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Plays</CardTitle>
            <Play className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{user.totalPlays}</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Wins</CardTitle>
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{user.totalWins}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quizzes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Quizzes</h3>
        <div className="space-y-2">
          {user.recentQuizzes.map((quiz, i) => (
            <Card className={""} key={i}>
              <CardContent className="py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-1">
                  <p className="font-medium">{quiz.title}</p>
                  <Badge className={""} variant="outline">{quiz.date}</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{quiz.score}</span>
                  <Badge className={""} variant={quiz.passed ? "default" : "destructive"}>
                    {quiz.passed ? "Passed" : "Failed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
