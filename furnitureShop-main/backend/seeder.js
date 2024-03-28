import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// Asynchronously function to import data into the database
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert user data into the User collection and get the inserted users
    const createdUsers = await User.insertMany(users);

    const admin = createdUsers[0]._id;

    // Adding the admin user to each product as the 'user' field
    const sample = products.map((product) => {
      return { ...product, user: admin };
    });

    // Insert the modified products into the Product collection
    await Product.insertMany(sample);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Asynchronously function to destroy data in the database
const destroyData = async () => {
  try {
    // Clear all data from these collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// If the script is run with '-d' argument, destroy the data, otherwise import it
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
