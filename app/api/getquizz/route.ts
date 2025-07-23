import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    let {id} = await request.json();
    let cookies = request.cookies
    if(cookies&& cookies.get('id')&&cookies.get("id").value!==""){

    }
    else {
        return NextResponse.json({error:"Please login First "},{
            status:401
        })
    }
    let db = await connectDB()
    let quizzes = db.collection("quizzes")
    let plays =  db.collection('plays')

    let previousPlay = await plays.findOne({
        userId:new ObjectId( cookies.get("id").value),
        quizId:new ObjectId(id)
    })

    if(previousPlay){
        return NextResponse.json({error:"You have already played this quiz"},{
            status:401
        })
    }
    

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