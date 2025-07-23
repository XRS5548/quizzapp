import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  let data = await request.json();
  let title = data.title;
  let description = data.description;
  let questions = data.questions;
  let cookies = request.cookies;
  if(cookies && cookies.get('id')&&cookies.get('id').value!==""){

  }
  else{
    return NextResponse.json({error:"user not loged in"},{
      status:500
    })
  }
  let mongourl = process.env.MONGOURL;
  let client = new MongoClient(mongourl);
  let db = client.db("quizzdatabase");
  let collection = db.collection("quizzes");

  let result = await collection.insertOne({
    title: title,
    description: description,
    questions: questions,
    createdAt: new Date(), // 👈 Added this line
    userId:new ObjectId( cookies.get('id').value)
  });

  return NextResponse.json(result);
}
