import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { getTodosForUser as getCardsForUser } from "../../businessLogic/cards";
import { getUserId } from "../utils";

//------------------------------------------------------------------------------------------------

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const userId = getUserId(event);
      const cards = await getCardsForUser(userId);
      return {
        statusCode: 200,
        body: JSON.stringify({ items: cards }),
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
handler.use(
  cors({
    credentials: true,
  })
);
