const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add at least one item to your order'
      });
    }

    let orderItems = [];
    let total = 0;

    for (const item of items) {
      orderItems.push({
        menuItem: item.menuItem,
        title: item.title || "Unknown Item",
        price: item.price || 0,
        quantity: item.quantity || 1
      });

      total += (item.price || 0) * (item.quantity || 1);
    }

    const user = await User.findOne({ userId: req.user.userId });

    const order = await Order.create({
      user: user._id,
      userName: user.name || "Unknown User",
      items: orderItems,
      total
    });
    
    const savedOrder = { 
      orderNumber: order.orderNumber,
      totalPrice: total,
      orderDate: order.createdAt || new Date()
    }

    user.orderHistory.push(savedOrder);
    await user.save();

const populatedOrder = await Order.findById(order._id).populate('user', 'name userId');
console.log('populatedOrder.user:',populatedOrder.user);
    
res.status(201).json({
      success: true,
      data: {
        orderId: populatedOrder.orderNumber,
        user: order.userName,
        eta: `${populatedOrder.eta}`,
        readyAt: new Date(Date.now() + populatedOrder.eta * 60000).toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate('user', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        orderId: order.orderNumber,
        eta: `${order.eta} min`,
        readyAt: new Date(Date.now() + order.eta * 60000).toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

