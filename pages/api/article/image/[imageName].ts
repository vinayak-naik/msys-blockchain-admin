import fs from "fs";
import path from "path";

export default function articleImages(req: any, res: any) {
  const filePath = path.resolve(
    ".",
    `public/article/images/${req.query.imageName}`
  );
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  return res.send(imageBuffer);
}
