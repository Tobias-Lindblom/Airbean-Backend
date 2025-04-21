const Product = require('../models/Product');
const fs = require('fs');

exports.getMenu = async (req, res) => {
  try {
    const menu = await Product.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta menyn' });
  }
};
exports.addProduct = async (req, res) => {
    const { title, desc, price } = req.body;
  
    if (!title || !price) {
      return res.status(400).json({ error: 'Namn och pris krävs' });
    }
  
    try {
      const product = new Product({ title, desc, price });
      await product.save();
  
      const logText = `
  [${new Date().toISOString()}] POST /api/menu
  Produkt tillagd:
  - Namn: ${product.title}
  - Pris: ${product.price} kr
  - Beskrivning: ${product.desc || 'Ingen'}
  ---------------------------------------------
  `;
      fs.appendFileSync('api-logg.txt', logText, 'utf8');
  
      // 📤 Skicka svar till klient
      res.status(201).json({ message: 'Produkt tillagd', product });
    } catch (err) {
      res.status(500).json({ error: 'Kunde inte lägga till produkten' });
    }
  };
