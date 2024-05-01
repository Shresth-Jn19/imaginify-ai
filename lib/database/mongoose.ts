// Importing mongoose and Mongoose interface from mongoose package
import mongoose, { Mongoose } from "mongoose";

// Getting MongoDB connection URL from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

// Defining an interface for Mongoose connection
interface MongooseConnection {
    conn: Mongoose | null; // Connection object
    promise: Promise<Mongoose> | null; // Promise object for connection
}

// Checking if a global mongoose object exists, if not, initializing it
let cached: MongooseConnection = (global as any).mongoose || {};

if(!cached){
    // If no global mongoose object, create one with null connection and promise
    cached = (global as any).mongoose = { 
        conn: null, 
        promise: null
    };
}

// Function to connect to MongoDB
const connectToDatabase = async () => {
    // If connection already exists, return it
    if(cached.conn) return cached.conn;

    // If MONGODB_URL is not defined, throw an error
    if(!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

    // If no connection promise exists, create one
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {dbName: 'imaginify', bufferCommands: false });

    // Await the connection promise and store the connection
    cached.conn = await cached.promise; 

    // Return the connection
    return cached.conn; 
}

// Export the connectToDatabase function
export default connectToDatabase;