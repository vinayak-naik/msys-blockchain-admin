import fs from "fs";

export default function addGuide(req: any, res: any) {
  const body = JSON.parse(req.body);

  const timestamp = new Date().getTime();
  let url = "http://" + req.headers.host;

  fs.writeFile(
    `./public/guide/json/guide_${timestamp}.json`,
    req.body,
    (err) => {
      if (err) throw err;
      fs.readFile(`./public/guide/guideList.json`, "utf8", (err, json) => {
        if (err) throw err;
        const list = JSON.parse(json);
        list.push({
          fileName: `guide_${timestamp}.json`,
          title: body.title,
          timestamp,
        });
        const stringifiedList = JSON.stringify(list, null, 2);

        fs.writeFile(
          `./public/guide/guideList.json`,
          stringifiedList,
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  );

  return res.send(url + "/api/guide/json/" + timestamp + ".json");
}
