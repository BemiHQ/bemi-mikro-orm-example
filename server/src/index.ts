import cors from "cors";
import express from "express";
import { MikroORM, RequestContext } from "@mikro-orm/postgresql";
import { DI } from "./di";

import { todosRouter } from "./todos.router";

const main = async (): Promise<void> => {
  const app = express();
  const port = 4001;
  DI.orm = await MikroORM.init();

  app.use(express.json());
  app.use(cors());
  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  app.use("/", todosRouter);

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
