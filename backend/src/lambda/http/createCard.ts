import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { CreateCardRequest } from "../../requests/CreateCardRequest";
import { getUserId } from "../utils";
import { CreateCard } from "../../businessLogic/cards";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newCard: CreateCardRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    try {
      const newItem = await CreateCard(newCard, userId);
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        statusCode: 201,
        body: JSON.stringify({
          item: newItem,
        }),
      };
    } catch (error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        statusCode: 500,
        body: JSON.stringify({ Error: error }),
      };
    }
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
