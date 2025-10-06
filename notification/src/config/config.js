import {config} from "dotenv";
config()

const _config = {
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
}

export default _config
