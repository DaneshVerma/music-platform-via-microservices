import {config} from "dotenv";
config()

const _config = {
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
}

export default _config
