// Quick connection test. Run from the project folder:
//   node --env-file=.env.local scripts/test-mongo.mjs
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// Show the shape of the string without revealing the password
console.log("Using:", uri.replace(/:[^:@/]*@/, ":****@").replace(/\?.*$/, ""));
console.log("Number of @ signs (must be 1):", (uri.match(/@/g) || []).length);

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  await client.db("sewmaistic").command({ ping: 1 });
  console.log("SUCCESS: connected to MongoDB!");
} catch (err) {
  console.log("FAILED:", err.name, "-", err.message);
} finally {
  await client.close();
}
