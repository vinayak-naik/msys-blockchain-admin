import NextCors from "nextjs-cors";

export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.json({ message: "Hello NextJs Cors!" });
}
