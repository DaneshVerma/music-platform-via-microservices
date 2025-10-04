import amqp from "amqplib";
import config from "../config/config.js";

let channel, connection;

export const connect = async () => {
  connection = await amqp.connect(config.RABBITMQ_URL);
  channel = await connection.createChannel();
  console.log("Connected to RabbitMQ");
};

export const subscribeToQueue = async (queueName, callback) => {
  await channel.assertQueue(queueName, { durable: true });
  await channel.consume(queueName, async (message) => {
    console.log("Message received", message);
    const data = JSON.parse(message.content.toString());
    await callback(data);
    channel.ack(message);
  });
};
