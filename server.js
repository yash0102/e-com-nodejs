const express = require("express");
const app = express()
const port = 3000;
const db = require('./src/config/mongoose.js');
const productRouter = require("./src/features/products/product.router.js");
const variantRouter = require("./src/features/variants/variants.router.js");

app.use(express.json())

app.use("/product",productRouter);
app.use("/variants",variantRouter);


app.listen(port,()=>{
    console.log('The app is running on port:',port)
})
