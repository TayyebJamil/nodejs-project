const { Kafka } = require("kafkajs");

// Initialize Kafka client
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
});

// Create a producer instance
const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log("Producer connected!");

  // Send messages to a topic
  await producer.send({
    topic: "test-topic",
    messages: [
      { key: "key1", value: "Hello KafkaJS!" },
      { key: "key2", value: "This is another message." },
    ],
  });

  console.log("Messages sent successfully!");
  await producer.disconnect();
};

// Run the producer
runProducer().catch(console.error);
