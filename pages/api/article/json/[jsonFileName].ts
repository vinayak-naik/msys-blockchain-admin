import fs from "fs";
import path from "path";

export default function articleImages(req: any, res: any) {
  const filePath = path.resolve(
    ".",
    `public/article/json/${req.query.jsonFileName}`
  );
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/json");
  return res.send(imageBuffer);
}
