const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    app.get("/toyota", async (req, res) => {
      const query = { brand_name: "Toyota" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/bmw", async (req, res) => {
      const query = { brand_name: "BMW" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/mercedes", async (req, res) => {
      const query = { brand_name: "Mercedes-Benz" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/tesla", async (req, res) => {
      const query = { brand_name: "Tesla" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/honda", async (req, res) => {
      const query = { brand_name: "Honda" };
      const result = await productColection.find(query).toArray();
      res.send(result);
    });
    app.get("/ford", async (req, res) => {
      const query = { brand_name: "Ford" };
      const result = await productColection.find(query).toArray();
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
