import { APIGatewayProxyResult } from "aws-lambda";
import { MikroORM } from "@mikro-orm/postgresql";
import 'reflect-metadata';
import { bemiContext } from "@bemi-db/mikro-orm";

import config from "./mikro-orm.config";
import { Todo } from "./todo.entity";


export const handler = async (
  event: any,
  context: any,
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log(`CONTEXT: ${JSON.stringify(context)}`);

    const orm = await MikroORM.init(config);
    bemiContext({
      field: `${event.typeName}.${event.fieldName}`,
      arguments: event.arguments,
      origin: event.request.headers.origin,
    })

    const em = orm.em.fork();
    const todos = await em.find(Todo, {});
    console.log(todos);
    const todo = todos[0];
    todo.isCompleted = !todo.isCompleted;
    await em.persistAndFlush(todo);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
