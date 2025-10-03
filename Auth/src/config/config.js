import { config } from "dotenv";
config();
const _config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
export default Object.freeze(_config);
