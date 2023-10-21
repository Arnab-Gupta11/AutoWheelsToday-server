const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// Connect mongdb Database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cliw5jo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const brandColection = client.db("BrandShopDB").collection("brands");
    const productColection = client.db("BrandShopDB").collection("products");
    const reviewsColection = client.db("BrandShopDB").collection("blogs");
    const cartCollection = client.db("BrandShopDB").collection("carts");
    const bannerCollection = client.db("BrandShopDB").collection("Banners");

    app.get("/brands", async (req, res) => {
      const cursor = brandColection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const cursor = productColection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/reviews", async (req, res) => {
      const cursor = reviewsColection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/carts", async (req, res) => {
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/carts/:email/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.findOne(query);
      res.send(result);
    });
    app.get("/banners/:name", async (req, res) => {
      const name = req.params.name;
      const query = { brand_name: name };
      const result = await bannerCollection.findOne(query);
      res.send(result);
    });
    app.get("/carts/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Toyota", async (req, res) => {
      const query = { brand_name: "Toyota" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Bmw", async (req, res) => {
      const query = { brand_name: "BMW" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Mercedes-Benz", async (req, res) => {
      const query = { brand_name: "Mercedes-Benz" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Tesla", async (req, res) => {
      const query = { brand_name: "Tesla" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Honda", async (req, res) => {
      const query = { brand_name: "Honda" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/Ford", async (req, res) => {
      const query = { brand_name: "Ford" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/brands/:name/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productColection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productColection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/carts", async (req, res) => {
      const newCart = req.body;
      const result = await cartCollection.insertOne(newCart);
      res.send(result);
    });

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const product = {
        $set: {
          image: updatedProduct.image,
          name: updatedProduct.name,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          brand_name: updatedProduct.brand_name,
          short_description: updatedProduct.short_description,
        },
      };
      const result = await productColection.updateOne(filter, product, options);
      res.send(result);
    });

    app.delete("/carts/:email/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Home Api
app.get("/", (req, res) => {
  res.send("Welcome to AutoWheelsToday Server");
});
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
