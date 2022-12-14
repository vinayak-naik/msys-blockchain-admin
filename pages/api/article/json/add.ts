import fs from "fs";

export default function addArticle(req: any, res: any) {
  const body = JSON.parse(req.body);

  const timestamp = new Date().getTime();
  let url = "http://" + req.headers.host;

  fs.writeFile(
    `./public/article/json/article_${timestamp}.json`,
    req.body,
    (err) => {
      if (err) throw err;
      fs.readFile(`./public/article/articleList.json`, "utf8", (err, json) => {
        if (err) throw err;
        const list = JSON.parse(json);
        list.push({
          fileName: `article_${timestamp}.json`,
          title: body.title,
          timestamp,
        });
        const stringifiedList = JSON.stringify(list, null, 2);

        fs.writeFile(
          `./public/article/articleList.json`,
          stringifiedList,
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  );

  return res.send(url + "/api/article/json/" + timestamp + ".json");
}
