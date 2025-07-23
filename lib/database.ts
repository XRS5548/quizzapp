import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGOURL!, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });

    await client.connect();
    db = client.db(process.env.DATABASE);
    console.log("✅ Connected to MongoDB");
  }
  return db;
}

export default connectDB;
