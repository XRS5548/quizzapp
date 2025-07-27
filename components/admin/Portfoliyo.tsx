"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Trophy } from "lucide-react";

export default function PortfoliyoUser() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [stats, setStats] = useState({
    totalCreated: 0,
    totalPlays: 0,
    totalWins: 0,
    recentQuizzes: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [infoRes, quizRes, playRes] = await Promise.all([
          fetch("/api/userinfo"),
          fetch("/api/user-quizzes", { method: "POST" }),
          fetch("/api/user-plays", { method: "POST" }),
        ]);

        const user = await infoRes.json();
        const quizzes = await quizRes.json();
        const plays = await playRes.json();

        const recentQuizzes = plays
          .sort((a: any, b: any) =>
            new Date(b.createdAt || b._id?.timestamp).getTime() -
            new Date(a.createdAt || a._id?.timestamp).getTime()
          )
          .slice(0, 5)
          .map((play: any) => {
            const playQuizId =
              play.quizId?.toString?.() || play.quizId?.$oid || play.quizId;
            const matchedQuiz = quizzes.find((q: any) => {
              const quizId =
                q._id?.toString?.() || q._id?.$oid || q._id;
              return quizId === playQuizId;
            });

            return {
              title: matchedQuiz?.title || "Untitled Quiz",
              date: new Date(play.createdAt || play._id?.timestamp).toLocaleDateString(),
              score: `${play.score}/${play.total}`,
              passed: play.pass,
            };
          });

        setUserInfo(user);
        setStats({
          totalCreated: quizzes.length,
          totalPlays: plays.length,
          totalWins: plays.filter((p: any) => p.pass).length,
          recentQuizzes,
        });
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchAll();
  }, []);

  if (!userInfo) return <div className="p-6">Loading portfolio...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <Card className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 p-4">
        <Avatar className="h-20 w-20">
          <AvatarImage className={""} src={userInfo.image} />
          <AvatarFallback className={""}>{userInfo.fname[0]}{userInfo.lname[0]}</AvatarFallback>
        </Avatar>
        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{userInfo.fname} {userInfo.lname}</h2>
          <p className="text-muted-foreground text-sm">{userInfo.bio}</p>
        </div>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Quizzes Created</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{stats.totalCreated}</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Plays</CardTitle>
            <Play className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{stats.totalPlays}</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Wins</CardTitle>
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <p className="text-2xl font-bold">{stats.totalWins}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quizzes Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Quizzes</h3>
        <div className="space-y-2">
          {stats.recentQuizzes.map((quiz: any, i: number) => (
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
