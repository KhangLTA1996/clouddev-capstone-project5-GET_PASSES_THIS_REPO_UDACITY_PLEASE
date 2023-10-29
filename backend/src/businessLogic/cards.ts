import { CardsAccess } from "./cardsAccess";
import { CardItem } from "../models/CardItem";
import { CreateCardRequest } from "../requests/CreateCardRequest";
import { UpdateCardRequest } from "../requests/UpdateCardRequest";
import { createLogger } from "../ultils/logger";
import * as uuid from "uuid";

const logger = createLogger("CardsAccess");
const cardsAccess = new CardsAccess();

export async function CreateCard(
  newItem: CreateCardRequest,
  userId: string
): Promise<CardItem> {
  logger.info("Call function create cards");
  const createdAt = new Date().toISOString();
  const cardId = uuid.v4();
  const _newItem = {
    userId,
    cardId,
    createdAt,
    done: false,
    ...newItem,
  };
  return await cardsAccess.create(_newItem);
}

export async function getCardsForUser(userId: string): Promise<CardItem[]> {
  logger.info("Call function getAll cards");
  return await cardsAccess.getAll(userId);
}

export async function UpdateCard(
  userId: string,
  cardId: string,
  updatedCard: UpdateCardRequest
): Promise<CardItem> {
  logger.info("Call function update cards");
  return await cardsAccess.update(userId, cardId, updatedCard);
}

export async function DeleteCard(
  userId: string,
  cardId: string
): Promise<String> {
  logger.info("Call function delete cards");
  return await cardsAccess.delete(userId, cardId);
}

export async function createAttachmentPresignedUrl(
  userId: string,
  cardId: string
): Promise<String> {
  logger.info("Call function createAttachmentPresignedUrl cards by " + userId);
  const uploadUrl = cardsAccess.getUploadUrl(cardId, userId);
  return uploadUrl;
}
