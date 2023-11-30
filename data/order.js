import { ObjectId } from "mongodb";
import {
  users as usersRef,
  orders as ordersRef,
} from "../config/mongoCollections.js";

export const createOrder = async (payload) => {
  const ordersCollection = await ordersRef();
  const usersCollection = await usersRef();

  let insertedInfo = await ordersCollection.insertOne(payload);

  if (insertedInfo.insertedCount === 0)
    throw "Error: Could not create an order";

  const updateInfo = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(payload?.userId) },
    { $push: { orders: payload } },
    { returnDocument: "after" }
  );

  if (updateInfo?.modifiedCount === 0)
    throw "Could not add order summary to user";

  return { ...payload, orderId: insertedInfo.insertedId.toString() };
};
