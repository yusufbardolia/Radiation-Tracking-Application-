// websocket.js
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const kafka = require('kafka-node');

// Create an HTTP server to serve index.html
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// WebSocket server
const wss = new WebSocket.Server({ server });

// Kafka consumer
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const Consumer = kafka.Consumer;
const consumer = new Consumer(
  client,
  [{ topic: 'processed-safecast-data2' }], // Replace with your Kafka topic name
  { fromOffset: 'earliest' } // Start consuming from the beginning of the topic
);

// WebSocket server logic
consumer.on('message', function(message) {
  console.log('Received message:', message);
  // Send message to all connected WebSocket clients
  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
});

wss.on('connection', function(ws) {
  console.log('Client connected');
  
  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

// Start the HTTP server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
