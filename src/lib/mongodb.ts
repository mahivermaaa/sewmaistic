import { MongoClient, Db } from "mongodb";

// One shared connection (survives hot reloads in dev and warm serverless starts).
const g = globalThis as unknown as { _sewmaisticMongo?: Promise<MongoClient> };

// Returns null when MONGODB_URI isn't set or the DB is unreachable,
// so a database problem never blocks a customer's payment.
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  try {
    g._sewmaisticMongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
    const client = await g._sewmaisticMongo;
    return client.db(process.env.MONGODB_DB || "sewmaistic");
  } catch (err) {
    g._sewmaisticMongo = undefined;
    console.error("MongoDB connection failed:", err);
    return null;
  }
}
