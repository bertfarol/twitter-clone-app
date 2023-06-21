// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addTweet } from "../../../sanity/lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { tweetInfo } = req.body;

    await addTweet(tweetInfo);

    // res.status(200).json(tweetInfo);
    res.status(200).json({ message: "Added new tweet." });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
}
