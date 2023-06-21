// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanity from "../../../sanity/lib/client-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   try {
     const query = `*[_type == "tweet"] { _type, _id, text, _createdAt, username, profileImg, image } | order(_createdAt desc) `;
     
     const data = await sanity.fetch(query);

     res.status(200).json(data);
   } catch (error) {
     res.status(500).json({ message: "Error fetching data" });
   }
}
