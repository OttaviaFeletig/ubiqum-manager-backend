import mongoose, { Schema, Document } from "mongoose";
export interface PageSchemaData extends Document {
  title: string;
  content: string;
  conflPageId: string;
  conflChildrenId: Array<string>;
  program: string;
}
const Page: Schema = new Schema({
  title: String,
  content: String,
  conflPageId: String,
  conflChildrenId: [String],
  program: String
});

module.exports = mongoose.model<PageSchemaData>("page", Page);
