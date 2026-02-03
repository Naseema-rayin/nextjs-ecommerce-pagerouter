import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Cart API is working" });
  }

  if (req.method === "POST") {
    return res.status(200).json({ message: "Item added to cart" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}