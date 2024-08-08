const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const Consumer = kafka.Consumer;
const consumer = new Consumer(
  client,
  [{ topic: 'processed-safecast-data2' }], // Replace with your Kafka topic name
  { fromOffset: 'earliest' } // Start consuming from the beginning of the topic
);

consumer.on('message', function(message) {
  console.log('Received message:', message);
  // Handle the message received from Kafka
  // Example: Emit message to front end via WebSocket or REST API
});

consumer.on('error', function(err) {
  console.error('Error:', err);
});
 