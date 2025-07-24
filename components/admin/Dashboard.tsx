"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, BookOpen, PlayCircle } from "lucide-react";

export default function DashboardUser() {
  // Dummy stats
  const totalPlays = 124;
  const totalWins = 36;
  const totalCreated = 7;

  // Dummy quizzes
  const quizzes = [
    { title: "JavaScript Basics", plays: 45, wins: 10, date: "2025-07-20" },
    { title: "React Advanced", plays: 30, wins: 12, date: "2025-07-18" },
    { title: "CSS Tricks", plays: 20, wins: 8, date: "2025-07-15" },
  ];

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
            {quizzes.map((quiz, index) => (
              <TableRow className={""} key={index}>
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell className={""}>{quiz.plays}</TableCell>
                <TableCell className={""}>{quiz.wins}</TableCell>
                <TableCell className={""}>{quiz.date}</TableCell>
                <TableCell className={""}>
                  <Badge className={""} variant="outline">
                    {quiz.plays > 20 ? "Active" : "New"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
