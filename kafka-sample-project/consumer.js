const { Kafka } = require("kafkajs");

// Initialize Kafka client
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: "test-group" });

const runConsumer = async () => {
  await consumer.connect();
  console.log("Consumer connected!");

  // Subscribe to a topic
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  // Run the consumer
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        key: message.key?.toString(),
        value: message.value.toString(),
      });
    },
  });
};

// Run the consumer
runConsumer().catch(console.error);
