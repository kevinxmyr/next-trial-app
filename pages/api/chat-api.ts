import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/connect-db";


const database_name = process.env.MONGODB_DATABASE || "";
const collection_name = process.env.MONGODB_COLLECTION || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio2025_db");
    const collection = db.collection("chat_coll");

    switch (req.method) {
      case "GET":
        const resp = await collection.find({}).toArray();
        console.log(resp);
        res.status(200).json(resp);
        break;

      case "POST":
        const { name } = req.body;
        const postResp = await collection.insertOne({ name });
        console.log(postResp);
        res.status(200).json(postResp);
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
