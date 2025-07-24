import connectDB from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookies = request.cookies;

  if (!cookies || !cookies.get("id") || cookies.get("id")?.value === "") {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  const userid = cookies.get("id")!.value;
  const db = await connectDB();
  const users = db.collection("users");

  const myuser = await users.findOne({ _id: new ObjectId(userid) });

  if (!myuser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();

  // Allowed fields
  const allowedFields = ["fname", "lname", "email", "bio", "image"];
  const updateData: any = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  await users.updateOne(
    { _id: new ObjectId(userid) },
    { $set: updateData }
  );

  return NextResponse.json({ message: "Profile updated successfully" });
}
