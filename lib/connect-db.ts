import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
// const uri_dev = process.env.MONGODB_URI_DEV as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
const options = {
   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
   connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
}

if(!process.env.MONGODB_URI){
   throw new Error("Please provide MONGODB_URI in the environment variables");
}

declare global {
   var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if(process.env.NODE_ENV === "development"){
   if(!global._mongoClientPromise){
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
   }
   clientPromise = global._mongoClientPromise;
} else {
   client = new MongoClient(uri, options);
   clientPromise = client.connect();
}

export default clientPromise;