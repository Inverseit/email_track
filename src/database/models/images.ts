import { Schema, Document, model, Model } from "mongoose";

interface Record {
  timestamp: number;
}

export interface ImageAttrs {
  filename: string;
  sender_email: string;
  reciever_email: string;
  records: Record[];
  _id: String;
  title: String;
}

export interface ImageModel extends Model<ImageDocument> {
  addOne(doc: ImageAttrs): ImageDocument;
}
export interface ImageDocument extends Document {
  filename: string;
  sender_email: string;
  reciever_email: string;
  title: string;
  records: Record[];
  createdAt: string;
  updatedAt: string;
}
export const imageSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    sender_email: {
      type: String,
      required: true,
    },
    reciever_email: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
      },
    records: [
      {
        timestamp: Number,
      },
    ],
  },
  {
    _id: false,
    timestamps: true,
  }
);

imageSchema.statics.addOne = (doc: ImageAttrs) => {
  return new Image(doc);
};

export const Image = model<ImageDocument, ImageModel>("Image", imageSchema);
