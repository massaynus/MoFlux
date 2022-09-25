import dotenv from "dotenv";

dotenv.config();

export const ENV = process.env.ENV || "PRODUCTION";

export const REDIS_URL = process.env.REDIS_URL;

export const SERVER_TOKEN = process.env.SERVER_TOKEN;
export const SERVER_PORT = process.env.SERVER_PORT;

export const STREAM_SERVICE_DELAY = parseInt(
  process.env.STREAM_SERVICE_DELAY || "10"
);
