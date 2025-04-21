const Product = require('../models/Product');

module.exports = async (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Ordern måste innehålla minst en produkt.' });
  }

  try {
    const menu = await Product.find();
    const invalidItems = [];

    for (let item of items) {
      const match = menu.find(prod => prod.title === item.title && prod.price === item.price);
      if (!match) {
        invalidItems.push(item.title);
      }
    }

    if (invalidItems.length > 0) {
      return res.status(400).json({
        error: `Följande produkter är ogiltiga eller har fel pris: ${invalidItems.join(', ')}`
      });
    }

    next(); 
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte validera ordern.' });
  }
};