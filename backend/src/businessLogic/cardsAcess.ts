import * as AWS from "aws-sdk";
const AWSXRay = require("aws-xray-sdk");
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from "../ultils/logger";
import { CardItem } from "../models/CardItem";
import { CardUpdate } from "../models/CardUpdate";

const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger("CardAccess");
const url_expiration = process.env.SIGNED_URL_EXPIRATION;
const s3_bucket_name = process.env.ATTACHMENT_S3_BUCKET;

export class CardsAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly cardsTable = process.env.CARDS_TABLE,
    private readonly cardsIndex = process.env.CARDS_CREATED_AT_INDEX,
    private readonly S3 = new XAWS.S3({ signatureVersion: "v4" }),
    private readonly bucket_name = s3_bucket_name
  ) {}

  async getAll(userId: string): Promise<CardItem[]> {
    logger.info("Call function getAll");
    const result = await this.docClient
      .query({
        TableName: this.cardsTable,
        IndexName: this.cardsIndex,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();
    return result.Items as CardItem[];
  }

  async create(item: CardItem): Promise<CardItem> {
    logger.info("Call function create");
    await this.docClient
      .put({
        TableName: this.cardsTable,
        Item: item,
      })
      .promise();
    return item as CardItem;
  }

  async update(
    userId: string,
    cardId: string,
    cardUpdate: CardUpdate
  ): Promise<CardItem> {
    logger.info(`Updating card item ${cardId} in ${this.cardsTable}`);
    try {
      await this.docClient
        .update({
          TableName: this.cardsTable,
          Key: {
            userId,
            cardId,
          },
          UpdateExpression:
            "set #name = :name, #dueDate = :dueDate, #done = :done, #attachmentUrl = :attachmentUrl ",
          ExpressionAttributeNames: {
            "#name": "name",
            "#dueDate": "dueDate",
            "#done": "done",
            "#attachmentUrl": "attachmentUrl",
          },
          ExpressionAttributeValues: {
            ":name": cardUpdate.name,
            ":dueDate": cardUpdate.dueDate,
            ":done": cardUpdate.done,
            ":attachmentUrl": cardUpdate.attachmentUrl,
          },
          ReturnValues: "UPDATED_NEW",
        })
        .promise();
    } catch (error) {
      logger.error("Error updating Card.", {
        error: error,
        data: {
          cardId,
          userId,
          cardUpdate,
        },
      });
      throw Error(error);
    }
    return cardUpdate as CardItem;
  }

  async delete(userId: string, cardId: string): Promise<String> {
    logger.info(`Deleting card item ${cardId} from ${this.cardsTable}`);
    try {
      await this.docClient
        .delete({
          TableName: this.cardsTable,
          Key: {
            userId,
            cardId,
          },
        })
        .promise();
      return "success";
    } catch (e) {
      logger.error("Error deleting Card.", {
        error: e,
      });
      return "Error";
    }
  }

  async getUploadUrl(cardId: string, userId: string): Promise<string> {
    const uploadUrl = this.S3.getSignedUrl("putObject", {
      Bucket: this.bucket_name,
      Key: cardId,
      Expires: Number(url_expiration),
    });
    await this.docClient
      .update({
        TableName: this.cardsTable,
        Key: {
          userId,
          cardId,
        },
        UpdateExpression: "set attachmentUrl = :URL",
        ExpressionAttributeValues: {
          ":URL": uploadUrl.split("?")[0],
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();
    return uploadUrl;
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log("Creating a local DynamoDB instance");
    return new XAWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
  }
  return new XAWS.DynamoDB.DocumentClient();
}
