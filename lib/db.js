import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) {
  throw new Error(" MONGO_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        dbName: "bostrohut",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log(" MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error(" MongoDB connection failed:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
