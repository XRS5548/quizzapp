import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    let cookies =  request.cookies;
    if(cookies && cookies.get("id")&&cookies.get('id').value !== ""){

    } 
    else return NextResponse.json({error:"Please login first"},{status:401})

    let db = await connectDB()
    let users =  db.collection("users")
    let myuser = await users.findOne({
        _id:new ObjectId(cookies.get('id').value)
    })

    return NextResponse.json(myuser);

}