import connectDB from "@/lib/database"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { id, title, description } = await request.json()
  const cookies = request.cookies

  if (!cookies || !cookies.get("id")?.value) {
    return NextResponse.json({ error: "Please login first" }, { status: 401 })
  }

  const db = await connectDB()
  const quizzes = db.collection("quizzes")

  const result = await quizzes.updateOne(
    {
      _id: new ObjectId(id),
      userId: new ObjectId(cookies.get("id")!.value),
    },
    {
      $set: {
        title,
        description,
        updatedAt: new Date(),
      },
    }
  )

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
