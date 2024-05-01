// Importing necessary modules from mongoose
import { Schema, model, models } from 'mongoose';

// Defining the mongoose schema for a User document
const UserSchema = new Schema ({
  // Clerk ID of the user, required and must be unique
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  // Email of the user, required and must be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Username of the user, required and must be unique
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Photo URL of the user, required
  photo: {
    type: String,
    required: true,
  },
  // First name of the user, optional
  firstName: {
    type: String,
  },
  // Last name of the user, optional
  lastName: {
    type: String,
  },
  // Plan ID of the user, defaults to 1 if not provided
  planId: {
    type: Number,
    default: 1,
  },
  // Credit balance of the user, defaults to 10 if not provided
  creditBalance: {
    type: Number,
    default: 10,
  },
});

// Creating the User model if it doesn't already exist
const User = models?.User || model("User", UserSchema);

// Exporting the User model
export default User;