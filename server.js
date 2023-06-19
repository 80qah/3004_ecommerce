const { Pool } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  password: 'wildcats',
  host: 'localhost',
  port: 5432,
  database: 'ecommerce',
});


// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.get('/Products', async (req, res) => {
  try {
    const products = await getProducts();
    console.log('Retrieved products:', products); // Debug statement
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ products }));
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/Orders', async (req, res) => {
  try {
    const orders = await getOrders();
    console.log('Retrieved orders:', orders); // Debug statement
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ orders }));
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/Sales', async (req, res) => {
  try {
    const sales = await getSales();
    console.log('Retrieved sales:', sales); // Debug statement
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ sales }));
  } catch (error) {
    console.error('Error retrieving sales:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(8080, () => console.log('Web server is listening on port 8080'));

async function getProducts() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public."Products"');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing products query:', error);
    return [];
  }
}

async function getOrders() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public."Orders"');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing orders query:', error);
    return [];
  }
}

async function getSales() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public."Sales"');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing sales query:', error);
    return [];
  }
}
