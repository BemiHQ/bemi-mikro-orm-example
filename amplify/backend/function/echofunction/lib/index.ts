import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { MikroORM } from "@mikro-orm/postgresql";
import 'reflect-metadata';

import config from "./mikro-orm.config";
import { Todo } from "./todo.entity";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: any,
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log(`CONTEXT: ${JSON.stringify(context)}`);

    const orm = await MikroORM.init(config);
    const em = orm.em.fork();
    const todos = await em.find(Todo, {});
    console.log(todos);

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
