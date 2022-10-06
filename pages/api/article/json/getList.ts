import fs from "fs";
import path from "path";

export default function articleImages(req: any, res: any) {
  console.log("getList api called");
  const filePath = path.resolve(".", `public/article/articleList.json`);
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/json");
  return res.send(imageBuffer);
}
