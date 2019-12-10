import mongoose, { Schema, Document } from "mongoose";
export interface UserSchemaData extends Document {
  googleId: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  picture: String;
}
const User: Schema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "User",
    enum: ["User", "Admin"]
  }
});

module.exports = mongoose.model<UserSchemaData>("user", User);
