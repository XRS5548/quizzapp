'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoaderThree } from '@/components/ui/loader'

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
  const router = useRouter()
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState(false)


  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch('/api/getquizz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        const data = await res.json()
        setInterval(() => {

          console.log(data.error == "You have already played this quiz")
          if (data.error == "You have already played this quiz") {
            setAlreadyPlayed(true)
            return
          }
          setQuiz(data)
        }, 2000);

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
      console.log(result)
      if (res.ok) {
        toast("Quiz Submitted", {
          description: result.message || "Your answers have been submitted!",
        })
        router.push("/user/profoliyo")
      }

      else {
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

  if (alreadyPlayed) {
    return <div className='flex min-h-screen justify-center items-center'>
      <div className='flex flex-col gap-3'>
        <h1 className="text-5xl border-b-4 border-white pb-2 ">You Already Played this Quizz</h1>
        <p className='text-center text-lg'>try another one for a chance to win</p>
        <div className='flex justify-center'>
          <Link href={'/quizs'} className='text-center' >
            <Button className={""} size={'lg'} variant={'default'}> Go Back</Button>
          </Link>
        </div>
      </div>
    </div>

  }
  else if (!quiz) {
    return <div className="p-6 text-center flex justify-center items-center min-h-screen">
      <LoaderThree />
    </div>
  }

  const currentQ = quiz.questions[currentQuestionIndex]
  const selected = selectedOptions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length

  return alreadyPlayed ? <div className='flex min-h-screen justify-center items-center'>
    <div>

      <h1 className="text-5xl">You Already Played this Quizz</h1>
      <p>try another one for a chance to win</p>
    </div>
  </div> : (
    <div className="max-w-3xl mt-20 mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <p className="text-muted-foreground">{quiz.description}</p>

      <Card className={""}>
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
        size={'lg'}
        className={""}
          variant="outline"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(i => i - 1)}
        >
          Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button size={'lg'} className={""} variant={'default'} onClick={() => setCurrentQuestionIndex(i => i + 1)}>
            Next
          </Button>
        ) : (
          <Button size={'lg'} className={""} variant={'default'} onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        )}
      </div>
    </div>
  )
}
