import dotenv from "dotenv";

dotenv.config();

export const ENV = process.env.ENV || "PRODUCTION";

export const REDIS_URL = process.env.REDIS_URL;

export const SERVER_TOKEN = process.env.SERVER_TOKEN;
export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_USE_REDIS_CACHE = process.env.SERVER_USE_REDIS_CACHE === 'true';
export const SERVER_REDIS_CACHE_TTL = parseInt(process.env.SERVER_REDIS_CACHE_TTL || '0');

export const STREAM_SERVICE_DELAY = parseInt(process.env.STREAM_SERVICE_DELAY || '10');
