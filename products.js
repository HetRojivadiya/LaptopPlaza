const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const laptopJSON = require('./public/products.json');
const connectDB = require("./DB/Connection");
const session = require('express-session');

const uri ="mongodb+srv://hetrojivadiya999:hetrojivadiya@het.ioacmg7.mongodb.net/Laptops?retryWrites=true&w=majority";
const laptopSchema = require('./model/Product_Model');
const myCartSchema = require('./model/MyCart');
const userSchema = require('./model/Users');


app.use(cors());
connectDB(uri);
app.use(express.json());


app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  
}));

// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual origin of your React app
//   credentials: true, // Enable credentials (cookies)
// };

app.get("/getSession", async (req, res) => {
  const username = req.session.username || "guest";
    res.send('hello, ' + username);
})

app.get("/setSession", async (req, res) => {
  req.session.username = 'het';
  console.log("set");
  res.json({ message: "Session is set" }); // Sending a JSON response
});

app.get('/fetch', async (req, res) => {
    
    const allProducts = await laptopSchema.find({});
    console.log("fetched all products");
    res.json(allProducts);
   
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;  
  try {
    const user = await userSchema.findOne({ email, password });
    if (user) {
      console.log(user);
      res.send("auth");
    } else {
      res.send("notauth");
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/myCart', async (req, res) => {
    
  const allProducts = await myCartSchema.find({});
  res.json(allProducts);
   
  });

  app.post('/addToCart', async (req, res) => {

    const product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      ram: req.body.ram,
      storage: req.body.storage,
      image_url: req.body.image_url,
      rating: req.body.rating,
      quantity: req.body.quantity
  };
  
    myCartSchema.create(product)
    .then(() => console.log("Added to cart"))
    .catch((err) => console.log(err))
    
  });

  app.put('/editProduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProductData = req.body;
  
      // Find and update the product in your database (MongoDB)
      const updatedProduct = await laptopSchema.findOneAndUpdate(
        { id: productId }, // Assuming "_id" is the product's MongoDB ID
        updatedProductData,
        { new: true } // To return the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  app.post('/removeProduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const myData = await myCartSchema.deleteOne({ id: productId }); 
      
      if (myData.deletedCount === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json({ message: "Product successfully removed from cart" });
      }
    } catch (error) {
      console.error("Error Removing from cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  app.get('/create',(req, res) =>{
    myCartSchema.create(laptopJSON)
    .then(() => console.log("create"))
    .catch((err) => console.log(err))
  })
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  





// app.use(session({
//   secret: 'mysecret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false, // Set to true in production if using HTTPS
//     maxAge: 3600000, // Session timeout in milliseconds (e.g., 1 hour)
//   },
// }));

// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual origin of your React app
//   credentials: true, // Enable credentials (cookies)
// };

// app.get("/getSession", async (req, res) => {
//   const username = req.session.username || "guest";
//     res.send('hello, ' + username);
// })

// app.get("/setSession", async (req, res) => {
//   req.session.username = 'het';
//   res.json({ message: "Session is set" }); // Sending a JSON response
// });