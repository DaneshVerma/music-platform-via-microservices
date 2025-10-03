import amqp from "amqplib";
import config from "../config/config.js";

let channel, connection;

export const connect = async function () {
  try {
    connection = await amqp.connect(config.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    await channel.assertQueue("auth_queue");
  } catch (error) {
    console.log(error);
  }
};

export const publishMessage = async function (queueName, message) {
  if (!channel) {
    await connect();
  }
  await channel.assertQueue(queueName, { durable: true });

  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    presistent: true,
  });
};
