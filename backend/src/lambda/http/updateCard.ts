import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { UpdateCard } from "../../businessLogic/cards";
import { UpdateCardRequest } from "../../requests/UpdateTodoRequest";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const cardId = event.pathParameters.cardId;
      const updatedCard: UpdateCardRequest = JSON.parse(event.body);
      const userId = getUserId(event);
      await UpdateCard(userId, cardId, updatedCard);
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        statusCode: 204,
        body: JSON.stringify({ item: updatedCard }),
      };
    } catch (error) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        statusCode: 500,
        body: JSON.stringify({ error: error }),
      };
    }
  }
);

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
