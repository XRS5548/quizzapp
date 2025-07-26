// POST /api/user-plays
import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookies = req.cookies;
    if (!cookies || !cookies.get('id') || cookies.get('id').value === "") {
        return NextResponse.json({ error: "user not loged in" }, {
            status: 401
        })
    }
    const id = req.cookies.get("id").value;

    const db = await connectDB();
    const plays = await db.collection("plays").find({ userId: new ObjectId(id) }).toArray();
    return NextResponse.json(plays);
}
