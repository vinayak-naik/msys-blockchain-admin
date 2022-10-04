// import fs from "fs";
// import path from "path";

export default function addArticle(req: any, res: any) {
  console.log(req.body);

  // fs.writeFile("myjsonfile.json", req.body, () => {
  //   console.log("done");
  // });

  return res.send("addArticle");
}
