require("dotenv").config();
const port = process.env.PORT; // Example of using an environment variable for the port
const DATABASE_URL = process.env.DATABASE_URL;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json()); // for parsing application/json
app.use(cors()); // for connecting our react app to the express

// connect to the database with mongodb
mongoose.connect(DATABASE_URL);

//API Creation
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    if (!file) {
      cb(new Error("No file provided"));
    } else {
      cb(null, Date.now() + path.extname(file.originalname)); // use path.extname to get the file extension
    }
  },
});
app.use("/images", express.static("uploads/images"));
//Creating upload endpoint for images
const upload = multer({ storage: storage });

app.post("/uploads", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//User Schema
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Delete product

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

//Get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

//Schema creating for user model
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User already exists" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secretkey");
  res.json({ success: true, token });
});

//Creating endpoint for login
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ success: false, errors: "Wrong Email" });
  }
  if (user.password !== req.body.password) {
    return res.status(400).json({ success: false, errors: "Wrong Password" });
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secretkey");
  res.json({ success: true, token });
});

//Creating endpoint for new collections
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Newcollection Fetched");
  res.send(newcollection);
});

//Creating endpoint for popular in women section
app.get("/popularwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularwomen = products.slice(0, 4);
  res.send(popularwomen);
});

//Creating middleware to fetch user
const fetchuser = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secretkey");
      req.user = data.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  }
};

//Creating endpoint for adding to cart
app.post("/addtocart", fetchuser, async (req) => {
  console.log(req.body);
});
app.listen(port, (err) => {
  if (!err) console.log(`Server is running on port ${port}`);
  else console.log(err);
});
