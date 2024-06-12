const express = require('express');
const redis = require('redis');
const redisClient = redis.createClient();
const { promisify } = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const app = express();
app.use(express.json());

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

const getItemById = (id) => listProducts.find((item) => item.id === id);

app.get('/list_products', (req, res) => {
  res.json(listProducts.map((item) => ({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
  })));
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

const reserveStockById = async (itemId, stock) => {
  const currentReservedStock = await getAsync(`item.${itemId}`);
  const newReservedStock = parseInt(currentReservedStock, 10) + stock;
  await redisSetAsync(`item.${itemId}`, newReservedStock);
};

const getCurrentReservedStockById = async (itemId) => {
  const currentReservedStock = await redisGetAsync(`item.${itemId}`);
  return currentReservedStock ? parseInt(currentReservedStock, 10) : 0;
};

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }

  const currentReservedStock = await getCurrentReservedStockById(itemId);
  res.json({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
    currentQuantity: item.stock - currentReservedStock,
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }

  const currentReservedStock = await getCurrentReservedStockById(itemId);

  if (currentReservedStock >= item.stock) {
    res.status(409).json({ status: 'Not enough stock available', itemId });
    return;
  }

  await reserveStockById(itemId, 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
