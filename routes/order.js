import { Router } from "express";
import { createOrder } from "../data/order.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    let payload = req.body;

    const newOrder = await createOrder({
      resId: payload?.id,
      items: payload?.cart,
      userId: payload?.userId,
      orderAt: new Date().toISOString(),
    });

    res.status(200).json(newOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

export default router;
