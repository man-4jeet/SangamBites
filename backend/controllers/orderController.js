import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing user order for frontend

const placeOrder = async (req, res) => {
  // defining frontend url
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // save in db
    await newOrder.save();
    // clear user cart after order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
//he stripe.checkout.sessions.create() method returns a promise, and the await keyword is used to wait for the promise to resolve, which will give you a session object containing details about the created checkout session, including its ID (session.id). This session ID can be used to retrieve the session details or track the payment status later. "This part of the code is responsible for creating a checkout session using the Stripe API." 
// A checkout session is an object that represents a user's interaction with the Stripe-hosted payment page where they can enter their payment information and complete a purchase
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    //here we have sent an success_url in the orderController as url in the session

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in payment" });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in verification of payment" });
  }
};
// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// listing order for admin panel
const listOrders = async (req, res) => {
  try {
    // getting all order data in order variable
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in updating status" });
  }
};
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
