
'use server'

import { MongoClient } from "mongodb"
import { redirect } from "next/navigation"
import bcrypt from 'bcryptjs'

export async function Submitform(formdata: FormData) {
    let fname = formdata.get("fname")
    let lname = formdata.get("lname")
    let email = formdata.get("email")
    let password = formdata.get("password")
    let cpassword = formdata.get("cpassword")
    if (password !== cpassword) return redirect('/message?msg=Password+not+match+please+type+same+passoword+in+confirm+password+field')
    let client = new MongoClient(process.env.MONGOURL)
    let db = client.db(process.env.DATABASE)
    let users = db.collection('users')

    //finding existing user
    let existinguser = await users.findOne({ email: email })
    if (existinguser) return redirect('/message?msg=User+already+exist+please+try+another+email+address')

    let hash = await bcrypt.hash(password.toString(),10);
    users.insertOne({
        "fname": fname,
        "lname": lname,
        "email": email,
        "password": hash        
    })
    return redirect('/login')

}

