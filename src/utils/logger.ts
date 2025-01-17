import { existsSync, mkdirSync } from "fs";

import pino from "pino";

const LOG_DIR = `${__dirname}/../../logs`;

if (!existsSync(LOG_DIR)) {
  mkdirSync(LOG_DIR);
}

const logger = pino(
  {
    level: "info",
  },
  pino.transport({
    targets: [
      {
        target : "pino/file",
        options: { destination: `${LOG_DIR}/app.log` }
      }
    ]
  })
);

export default logger;