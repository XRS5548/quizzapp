import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    let {quizId , answers} = await request.json()
    let exampleanswer = { '0': 'A','s': 'A' }

    //fetch quizz 
    let db = await connectDB()
    let quizzes = db.collection("quizzes")
    let myquizz = await quizzes.findOne({
        _id:new ObjectId(quizId)
    })
    if(!myquizz) return NextResponse.json({error:"Quizz not found"},{status:401});

    let quizzQuestion = myquizz.questions
    
    let score = 0
    let totalQuesions = quizzQuestion.length


    for (let key  in answers){
        let correctAnswer = quizzQuestion[parseInt(key)].correctAnswer
        if (answers[key] == correctAnswer){
            score ++;
        }
    }

    let percentage = (score / totalQuesions) * 100;




    return NextResponse.json({
        score:score,
        total:totalQuesions,
        percentage:percentage.toFixed(2),
    } ,{
        status:200
    })
}