import { config } from "dotenv";
config();
const _config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
export default Object.freeze(_config);
