import mongoose, { Schema, Document } from "mongoose";

export interface ArticleDocument extends Document {
  id: string;
  title: string;
  summary: string;
  date: string;
  formattedDate: string;
  tags: string[];
}

const ArticleSchema = new Schema<ArticleDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: String, required: true },
    formattedDate: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.article ||
  mongoose.model<ArticleDocument>("article", ArticleSchema);
