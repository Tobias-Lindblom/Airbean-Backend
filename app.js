const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const addUserOrderRouter = require('./routes/addUserOrder')
const meRouter = require('./routes/me')


dotenv.config();

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB ansluten'))
  .catch(err => console.error(' MongoDB-fel:', err));


app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/users/register', registerRouter)
app.use('/users/login', loginRouter)
app.use('/order', addUserOrderRouter)
app.use('/users/me', meRouter)


app.listen(PORT, () => {
  console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});