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
    let pass = (percentage >= 50) ? true : false


    // get userid 
    let cookie = request.cookies
    if(cookie && cookie.get('id')&& cookie.get('id').value !==""){

    }
    else {
        return NextResponse.json({
            error:"You must be logged in to submit your answers",
        },{
            status:401
        })
    }
    let userId = cookie.get('id').value



    let ReadyData = {
        score:score,
        total:totalQuesions,
        percentage:percentage.toFixed(2),
        pass:pass,
        userId: new ObjectId(userId),
        quizId:new ObjectId(quizId)

    }

    let plays = db.collection("plays")
    let result = await plays.insertOne(ReadyData)


    return NextResponse.json( result ,{
        status:200
    })
}