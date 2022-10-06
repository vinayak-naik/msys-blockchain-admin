import fs from "fs";
import path from "path";

export default function guideImages(req: any, res: any) {
  console.log("getList api called");
  const filePath = path.resolve(".", `public/guide/guideList.json`);
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/json");
  return res.send(imageBuffer);
}
