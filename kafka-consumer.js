const kafka = require('kafka-node');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  password: 'mae1997',
  host: 'localhost',
  port: 5432,
  database: '3004_db',
});

const PORT = 8001;

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Function to update product data in the database
async function updateProductData(productData) {
  const { productId, name, category, subCategory, stock, price } = productData;

  try {
    const client = await pool.connect();
    const query = `
      UPDATE public."Products"
      SET "Name" = $1, "Category" = $2, "Sub Category" = $3, "Stock" = $4, "Price" = $5
      WHERE product_id = $6;
    `;
    const values = [name, category, subCategory, stock, price, productId];
    await client.query(query, values);
    client.release();
  } catch (error) {
    console.error('Error updating product data:', error);
    throw error;
  }
}

// Kafka consumer configuration
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'product-updates', partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', async (message) => {
  const { productId, name, category, subCategory, stock, price } = JSON.parse(message.value);

  try {
    await updateProductData({ productId, name, category, subCategory, stock, price });
    console.log('Product data updated successfully');
  } catch (error) {
    console.error('Error updating product data:', error);
  }
});

consumer.on('error', (error) => {
  console.error('Error with Kafka consumer:', error);
});

const server = app.listen(PORT, () => {
  console.log(`Web server is listening on port ${PORT}`);
});
