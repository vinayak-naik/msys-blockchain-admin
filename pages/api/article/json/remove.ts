export default function removeArticle(req: any, res: any) {
  console.log(req.body);

  return res.send(req.body);
}