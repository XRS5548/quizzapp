import connectDB from "@/lib/database"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { id } = await request.json()
  const cookies = request.cookies

  if (!cookies || !cookies.get("id")?.value) {
    return NextResponse.json({ error: "Please login first" }, { status: 401 })
  }

  const db = await connectDB()
  const quizzes = db.collection("quizzes")

  const result = await quizzes.deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(cookies.get("id")!.value),
  })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
