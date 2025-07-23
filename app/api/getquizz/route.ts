import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    let {id} = await request.json();

    let db = await connectDB()
    let quizzes = db.collection("quizzes")
    let myquizz = await quizzes.findOne({
        _id: new ObjectId(id)
    })
    if(myquizz) {

    }
    else {
        return NextResponse.json({error:"No quiz found"}, {status:404})
    }

    return NextResponse.json(myquizz, {status:200})

}