import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import connectDB from "@/lib/database";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    let db = await connectDB()    
    let collection = db.collection('users')
    
    let user = await collection.findOne({ email: email })
    if (user) {
        let hashedPassword = user.password
        if (await bcrypt.compare(password, hashedPassword)) {
            // success
            let response = NextResponse.json({ message: "success" })
            response.cookies.set("fname", user.fname)
            response.cookies.set("lname", user.lname)
            response.cookies.set("email", user.email)
            let id = new ObjectId(user._id)
            response.cookies.set("id", id.toString())
            return response
        }
        else {
            // failed
            let response = NextResponse.json({ error: "Username or password is invailed" })
            return response
        }
    }
    else {
        // user not found
        let response = NextResponse.json({ error: "Username or password is invailed" })
        return response

    }



}