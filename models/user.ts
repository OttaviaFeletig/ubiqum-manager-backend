import mongoose, { Schema, Document } from "mongoose";
export interface UserSchemaData extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    isLoggedIn: boolean
}
const User: Schema = new Schema({
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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "User",
        enum: ["User", "Admin"]
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model<UserSchemaData>("page", User);