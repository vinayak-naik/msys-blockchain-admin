import fs from "fs";
import path from "path";

export default function guideImages(req: any, res: any) {
  const filePath = path.resolve(
    ".",
    `public/guide/images/${req.query.imageName}`
  );
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  return res.send(imageBuffer);
}
