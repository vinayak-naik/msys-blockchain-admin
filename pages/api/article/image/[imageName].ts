import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function articleImages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const filePath = path.resolve(
    ".",
    `public/article/images/${req.query.imageName}`
  );
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  return res.status(200).send(imageBuffer);
}
