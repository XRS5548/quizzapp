"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuizPage() {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAnswer) {
            setFeedback("⚠️ Please select an answer.");
            return;
        }

        if (selectedAnswer === "C") {
            setFeedback("✅ Correct! Paris is the capital of France.");
        } else {
            setFeedback("❌ Incorrect. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="min-w-xl mx-auto mt-10 p-6  rounded-2xl shadow-md">
                <i className="text-slate-500">Quizz : 144a5sfasgas4ga8s</i>
                <hr />
                <h2 className="text-2xl font-semibold mb-4">Question 1</h2>
                <p className=" mb-6">What is the capital of France?</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { value: "A", label: "Berlin" },
                        { value: "B", label: "Madrid" },
                        { value: "C", label: "Paris" },
                        { value: "D", label: "Rome" },
                    ].map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-400"
                        >
                            <input
                                type="radio"
                                name="answer"
                                value={option.value}
                                checked={selectedAnswer === option.value}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                className="form-radio text-blue-600"
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}

                    <Button size={'lg'} variant="default" className={""} >Next</Button>
                </form>

                {feedback && (
                    <div
                        className={`mt-4 text-center font-medium ${feedback.includes("Correct")
                                ? "text-green-600"
                                : feedback.includes("Incorrect")
                                    ? "text-red-600"
                                    : "text-yellow-600"
                            }`}
                    >
                        {feedback}
                    </div>
                )}
            </div>
        </div>

    );
}
