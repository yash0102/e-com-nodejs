const express = require("express");
const app = express()
const port = 3000;
const db = require('./src/config/mongoose.js');
const productRouter = require("./src/features/products/product.router.js");
const variantRouter = require("./src/features/variants/variants.router.js");

app.use(express.json())

app.use("/api/product",productRouter);
app.use("/api/variants",variantRouter);

// Default request handler
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})

// Middleware to handle 404 requests.
app.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information");
})

app.listen(port,()=>{
    console.log('The app is running on port:',port)
})
