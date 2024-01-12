const express = require("express");
const app = express()
const port = 3000;
const productRouter = require("./src/features/products/product.router.js");
const db = require('./src/config/mongoose.js');

app.use(express.json())

app.use("/product",productRouter);


app.listen(port,()=>{
    console.log('The app is running on port:',port)
})
