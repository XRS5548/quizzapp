"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, BookOpen, PlayCircle } from "lucide-react";
import { LoaderThree } from "../ui/loader";

export default function DashboardUser() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [plays, setPlays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // These stats will be calculated
  const totalCreated = quizzes.length;
  const totalPlays = plays.length;
  const totalWins = plays.filter((p) => p.pass).length;

  useEffect(() => {
    const token = localStorage.getItem("token"); // or use cookie if needed

    const fetchData = async () => {
      try {
        const [quizRes, playRes] = await Promise.all([
          fetch("/api/user-quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }),
          fetch("/api/user-plays", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }),
        ]);

        const quizzesData = await quizRes.json();
        const playsData = await playRes.json();

        setQuizzes(quizzesData || []);
        setPlays(playsData || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          
        }, 2000);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 flex min-h-screen justify-center items-center"><LoaderThree /></div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Quizzes Created</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{totalCreated}</div>
            <p className="text-xs text-muted-foreground">Across all topics</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
            <PlayCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{totalPlays}</div>
            <p className="text-xs text-muted-foreground">By all users</p>
          </CardContent>
        </Card>

        <Card className={""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{totalWins}</div>
            <p className="text-xs text-muted-foreground">Successful attempts</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Created Quizzes</h3>
        <Table className={""}>
          <TableHeader className={""}>
            <TableRow className={""}>
              <TableHead className={""}>Title</TableHead>
              <TableHead className={""}>Plays</TableHead>
              <TableHead className={""}>Wins</TableHead>
              <TableHead className={""}>Date</TableHead>
              <TableHead className={""}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={""}>
            {quizzes.map((quiz, index) => {
              const quizId = quiz._id;
              const quizPlays = plays.filter((p) => p.quizId === quizId || p.quizId?._id === quizId);
              const quizWins = quizPlays.filter((p) => p.pass);

              return (
                <TableRow className={""} key={index}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell className={""}>{quizPlays.length}</TableCell>
                  <TableCell className={""}>{quizWins.length}</TableCell>
                  <TableCell className={""}>{new Date(quiz.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className={""}>
                    <Badge className={""} variant="outline">
                      {quizPlays.length > 5 ? "Active" : "New"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
