const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const laptopJSON = require('./public/products.json');

const connectDB = require("./DB/Connection");

const uri ="mongodb+srv://hetrojivadiya999:hetrojivadiya@het.ioacmg7.mongodb.net/Laptops?retryWrites=true&w=majority";
const laptopSchema = require('./model/Product_Model');
const myCartSchema = require('./model/MyCart');

connectDB(uri);

app.use(cors());
app.use(express.json());

app.get('/fetch', async (req, res) => {
    
    const allProducts = await laptopSchema.find({});
    console.log("fetched all products");
    res.json(allProducts);
   
});

app.get('/myCart', async (req, res) => {
    
  const allProducts = await myCartSchema.find({});
  console.log("fetched all products");
  res.json(allProducts);
   
  });

  app.post('/addToCart', async (req, res) => {
    console.log(req.body);
    myCartSchema.create(req.body)
    .then(() => console.log("Added to cart"))
    .catch((err) => console.log(err))
    
  });
  
  app.post('/removeProduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const myData = await myCartSchema.deleteOne({ id: productId }); // Assuming your product ID field is named '_id'
      
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
  