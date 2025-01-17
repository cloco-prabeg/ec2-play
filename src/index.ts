import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";

import logger from "./utils/logger";

const PORT = 8848;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.use((_req: Request, res: Response) => {
  res.status(400).json({ message: "Resource not found" });
});

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") {
    logger.error(`${req.method}:${req.path} >> ${error.stack} || ${error.message}`);
  }

  res.status(500).json({ message: "Kuch toh gadbad hey" });
});

app.listen(PORT, () => console.log(`Server running on 0.0.0.0:${PORT}`));
