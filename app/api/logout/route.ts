import { NextRequest, NextResponse } from "next/server";

export async function GET (request:NextRequest) {
    let response = NextResponse.json({message:"OK"})
    response.cookies.delete("id")
    response.cookies.delete("fname")
    response.cookies.delete("lname")
    response.cookies.delete("email")
    return response


}