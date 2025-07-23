import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    let db = await connectDB();
    let quizzes = db.collection("quizzes")
    let cookies = request.cookies

    if(cookies&&cookies.get("id")&&cookies.get('id').value!=""){

    }else{
        return NextResponse.json({"error":"User Not loged in"},{
            status:500
        })
    }
    

    let quizzesData = (await quizzes.find({
        userId :new ObjectId(cookies.get("id").value)
    }).toArray()).toReversed();
    quizzesData.map(qizz=>{
        qizz['id'] = qizz._id || "N/A"
        qizz['totalQuestions'] = qizz.questions.length || "N/A"
        qizz['createdAt'] = qizz.createdAt || "N/A"
        

    })
    return  NextResponse.json(quizzesData,{
        status:200
    })
}