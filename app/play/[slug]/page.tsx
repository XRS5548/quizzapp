'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from 'sonner'

// Utility function for conditional classNames
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

interface Question {
  questionText: string
  options: string[]
  correctAnswer: string
}

interface QuizData {
  title: string
  description: string
  questions: Question[]
}

export default function QuizPlayPage() {
  const pathname = usePathname()
  const id = pathname.split('/').pop()
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch('/api/getquizz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        const data = await res.json()
        setQuiz(data)
      } catch (err) {
        console.error('Failed to load quiz', err)
      }
    }

    if (id) fetchQuiz()
  }, [id])

  const handleOptionChange = (value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }))
  }

  const handleSubmit = async () => {
    if (!quiz) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/playsubmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: id,
          answers: selectedOptions
        })
      })

      const result = await res.json()

      if (res.ok) {
        toast("Quiz Submitted", {
          description: result.message || "Your answers have been submitted!",
        })
      } else {
        toast("Submission Failed", {
          description: result.error || "Something went wrong",
        })
      }
    } catch (err) {
      toast("Submission Failed", {
        description: "An unexpected error occurred.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!quiz) return <div className="p-6 text-center">Loading Quiz...</div>

  const currentQ = quiz.questions[currentQuestionIndex]
  const selected = selectedOptions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length

  return (
    <div className="max-w-3xl mt-20 mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <p className="text-muted-foreground">{quiz.description}</p>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Q{currentQuestionIndex + 1}: {currentQ.questionText}
          </h2>

          <div className="grid gap-3">
            {currentQ.options.map((opt, idx) => {
              const label = String.fromCharCode(65 + idx)
              const isSelected = selected === label

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionChange(label)}
                  className={cn(
                    "w-full px-4 py-3 text-left rounded-lg border transition duration-200",
                    isSelected
                      ? "border-primary bg-primary/10 font-semibold"
                      : "border-muted hover:bg-muted"
                  )}
                >
                  <span className="font-medium mr-2">{label}.</span> {opt}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(i => i - 1)}
        >
          Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button onClick={() => setCurrentQuestionIndex(i => i + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        )}
      </div>
    </div>
  )
}
