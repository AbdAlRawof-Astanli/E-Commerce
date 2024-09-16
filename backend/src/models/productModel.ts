import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, requird: true },
  image: { type: String, requird: true },
  price: { type: Number, requird: true },
  stock: { type: Number, requird: true, default: 0 },
});

const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
