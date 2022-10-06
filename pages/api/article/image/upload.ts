import nc from "next-connect";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = nc();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/article/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + "png");
  },
});
let upload = multer({
  storage: storage,
});
let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req: any, res: any) => {
  let url = "http://" + req.headers.host;
  let filename = req.file.filename;
  res.status(200).send({
    result: filename,
    url: url + "/api/article/image/" + req.file.filename,
  });
});

export default handler;
