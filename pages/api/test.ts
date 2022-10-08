// export default function test(req: any, res: any) {
//   console.log("test-api-called");
//   return res.status(200).json({ status: "success" });
// }

import NextCors from "nextjs-cors";

export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.json({ message: "Hello NextJs Cors!" });
}
