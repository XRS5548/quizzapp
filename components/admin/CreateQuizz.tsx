"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuizForm() {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updated = [...questions];
    if (field === "questionText") {
      updated[index].questionText = value;
    } else if (field === "correctAnswer") {
      updated[index].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const quizData = {
    title: quizTitle,
    description: quizDescription,
    questions,
  };

  try {
    const response = await fetch("/api/createquizz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Quiz Created Successfully!");
      console.log("Server Response:", result);
      // optionally clear the form
      setQuizTitle("");
      setQuizDescription("");
      setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
    } else {
      alert("❌ Failed to create quiz: " + result.error);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Something went wrong while submitting the quiz.");
  }
};


  return (
    <div className="">
      <Card className={""}>
        <CardHeader className={""}>
          <CardTitle className={""}>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent className={""}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Quiz Info */}
              <div className="space-y-4">
                <Label className={""} htmlFor="quiz-title">Quiz Title</Label>
                <Input type={"text"} className={""}
                  id="quiz-title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  required
                />

                <Label className={""} htmlFor="quiz-description">Description</Label>
                <Textarea className={""}
                  id="quiz-description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Brief description about the quiz"
                  required
                />
              </div>

              <Separator className={""} />

              {/* Dynamic Questions */}
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-6 border rounded-xl p-4">
                  <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>

                  <div className="space-y-2">
                    <Label className={""}>Question Text</Label>
                    <Input type={"text"} className={""}
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "questionText", e.target.value)
                      }
                      placeholder="Enter the question"
                      required
                    />
                  </div>

                  {["A", "B", "C", "D"].map((label, oIndex) => (
                    <div key={oIndex} className="space-y-2">
                      <Label className={""}>Option {label}</Label>
                      <Input type={"text"} className={""}
                        value={q.options[oIndex]}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        placeholder={`Enter option ${label}`}
                        required
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label className={""}>Correct Answer</Label>
                    <Select
                      value={q.correctAnswer}
                      onValueChange={(val) =>
                        handleQuestionChange(qIndex, "correctAnswer", val)
                      }
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                      <SelectContent className={""}>
                        {["A", "B", "C", "D"].map((opt, i) => (
                          <SelectItem className={""} key={opt} value={opt}>
                            Option {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}

              <Button size={"lg"}
                type="button"
                variant="outline"
                onClick={addNewQuestion}
                className="mt-2"
              >
                + Add Another Question
              </Button>

              <div className="flex justify-end pt-6">
                <Button size={"lg"} variant={"default"} className={""} type="submit">Create Quiz</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
