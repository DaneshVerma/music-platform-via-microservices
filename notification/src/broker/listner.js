import { subscribeToQueue } from "./rabbit.js";    
import sendEmail from "../utils/email.js";

export default async () => {
    await subscribeToQueue("auth_queue", (data) => {
        const template = `
        <h1>Welcome to our app</h1>
        <p>Thank you for registration</p>
        `;
        sendEmail(data.email, "Welcome to our app", template);
    });
};