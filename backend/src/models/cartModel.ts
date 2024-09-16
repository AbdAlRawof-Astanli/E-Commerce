import mongoose, { Document, Schema, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}
// status is for check to not create 2 cart active in database
export interface ICart extends Document {
  userId: string | ObjectId;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [cartItemSchema], default: [] },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: cartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
