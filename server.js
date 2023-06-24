const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
//const kafka = require('kafka-node');
const app = express();
app.use(express.json());
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5434,
  database: 'ecommerce-db',
});
const PORT = 8000;



// // Kafka Producer setup
// const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new kafka.Producer(kafkaClient);
// producer.on('ready', function () {
//   console.log('Kafka Producer is ready');
// });
// producer.on('error', function (error) {
//   console.error('Error occurred while initializing Kafka Producer:', error);
// });
// app.post('/updateProduct', async (req, res) => {
//   const { productId, name, category, subCategory, stock, price } = req.body;
//   try {
//     await updateProductData({ productId, name, category, subCategory, stock, price });
//     // Produce a message to Kafka when the product is updated
//     const messagePayload = JSON.stringify({ productId, name, category, subCategory, stock, price });
//     const payload = [
//       { topic: 'product-updates', messages: messagePayload }
//     ];
//     producer.send(payload, (error, data) => {
//       if (error) {
//         console.error('Error sending message to Kafka:', error);
//       } else {
//         console.log('Message sent to Kafka:', data);
//       }
//     });
//     console.log('Product data updated successfully');
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error updating product data:', error);
//     res.sendStatus(500);
//   }
// });
// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());

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
// app.put('/updateProduct', async (req, res) => {
//   const { productId, name, category, subCategory, stock, price } = req.body;
//   try {
//     await updateProductData({ productId, name, category, subCategory, stock, price });
//     console.log('Product data updated successfully');
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error updating product data:', error);
//     res.sendStatus(500);
//   }
// });
app.listen(PORT, () => console.log(`Web server is listening on port ${PORT}`));
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
// SQL queries
const queries = {
  getProductById: 'SELECT * FROM public."Products" WHERE product_id = $1',
  updateProduct: 'UPDATE public."Products" SET "Name" = $1, "Category" = $2, "Sub Category" = $3, "Stock" = $4, "Price" = $5 WHERE product_id = $6',
  reserveStock: 'UPDATE public."Products" SET "Stock" = $1 WHERE product_id = $2',
  getOrderById: 'SELECT * FROM public."Orders" WHERE "Order_id" = $1',
  updateOrderStatus: 'UPDATE public."Orders" SET "Order_Status" = $1 WHERE "Order_id" = $2',
};

//Route to update a product
app.put("/updateItem/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the product ID from the URL parameter
  const { name, category, subCategory, stock, price } = req.body;
  pool.query(queries.getProductById, [id], (error, results) => {
    const noProductFound = !results.rows.length;
    if (noProductFound) {
      res.send("Product does not exist in the database");
    } else {
      pool.query(
        queries.updateProduct,
        [name, category, subCategory, stock, price, id],
        (error, results) => {
          if (error) {
            console.error("Error updating product:", error);
            res.status(500).send("Error updating product");
          } else {
            res.status(200).send("Product updated successfully");
          }
        }
      );
    }
  });
});

// Route to update an order status
app.put("/updateOrderItem/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the order ID from the URL parameter
  const { status } = req.body;
  pool.query(queries.getOrderById, [id], (error, results) => {
    const noOrderFound = !results.rows.length;
    if (noOrderFound) {
      res.send("Order does not exist in the database");
    } else {
      pool.query(
        queries.updateOrderStatus,
        [status, id],
        (error, results) => {
          if (error) {
            console.error("Error updating order status:", error);
            res.status(500).send("Error updating order status");
          } else {
            res.status(200).send("Order status updated successfully");
          }
        }
      );
    }
  });
});

// Define a route for reserving inventory
app.put("/reserveInventory/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the product ID from the URL parameter
  const quantityToReserve = parseInt(req.body.quantity); // Extract the quantity from the request body

  pool.query(queries.getProductById, [id], (error, results) => {
    const noProductFound = !results.rows.length;
    if (noProductFound) {
      res.send("Product does not exist in the database");
    } else {
      pool.query(
        queries.reserveStock,
        [quantityToReserve, id],
        (error, results) => {
          if (error) {
            console.error("Error reserving inventory:", error);
            res.status(500).send("Error reserving inventory for product");
          } else {
            res.status(200).json({ message: 'Inventory reserved successfully' });
          }
        }
      );
    }
  });
});