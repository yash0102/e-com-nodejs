# Mirrar

REST API for an e-commerce system using Node.js Express.js framework and database used is MongoDB.

    - Endpoints to create, update, delete and retrieve products.
    - Endpoints to create, update, delete and retrieve variants.
    - A product has name, description, price, and variants.
    - A variant has name, SKU, additional cost, stock count and productId.
    - An endpoint for searching products by product name, description.

## Run Locally

Clone the project

```
  git clone https://github.com/yash0102/e-com-nodejs.git
```

Go to the project directory

```bash
  cd e-com-nodejs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## API Reference
### PRODUCTS
#### Add a Product

```http
    POST http://localhost:3000/api/product
```

```sh 
#body example
{
    "name":"iphone 14",
    "description":"The iPhone 14 is a smartphone from Apple Inc. that comes in various colors and sizes1. It has an improved camera system, a faster A15 Bionic chip and a new Action mode for video capture.",
    "price":80000
}
```

Here we are making a post request for adding a single product.The Product object will have name, description and price key.Then the \_id will be added automatically in the database for unique identification.

#### Get all the Products

```http
    GET http://localhost:3000/api/product

```

This API is used to fetch all the products presnt in the database.

#### Get a Single Product

```http
    GET http://localhost:3000/api/product/${productId}
```

```sh 
#example
    GET http://localhost:3000/api/product/65a11efbe84a81f851260287
```
Here we are passing productId as a params to get a specified product.

#### Update a Product

```http
    PATCH http://localhost:3000/api/product/${productId}
```
```sh
    #body example
    {
        "name":"iphone 14s",
        "description":"This is Budget Friendly phone",
        "price": 50000
    }
```
Here we are making a patch request for updating a single product.The productId key is used to search a specific product and update it.


#### Search a Product based on name, description
```http
  GET http://localhost:3000/api/product/search?text=${word}
```
```sh
    #example
    http://localhost:3000/api/product/search?text=vivo
```
Here we are passing word as a quary to search based on product name, description present in the database.

#### Delete a Product

```http
  DELETE http://localhost:3000/api/product/${productId}
```
```sh
    #example
    http://localhost:3000/api/product/65a18aa7702909c47b63c106
```
Here we are passing productId as a params to delete a specified Product.

### VARIANTS

#### Add a Variant

```http
    POST http://localhost:3000/api/variants/${productID}
```
```sh
    #body example
    {
        "name":"iphone 14 pro",
        "additional_cost" : 20000
    }
```
Here we are making a post request for adding a variant to a specific product.


#### Get a Variant By ID

```http
    GET http://localhost:3000/api/variants/${productId}
```

```sh 
#example
    GET http://localhost:3000/api/variants/65a11efbe84a81f851260287
```
Here we are passing productId as a params to get a specified variants of a product.


#### Update a Variant

```http
    PATCH http://localhost:3000/api/variants/${variantID}
```
```sh
    #body example
    {
        "name":"OnePlus 12s",
        "additional_cost":5000
    }
```
Here we are making a patch request for updating a variant of a specific product.

#### Delete a Variant

```http
  DELETE http://localhost:3000/api/product/${variantID}
```
```sh
    #example
    http://localhost:3000/api/product/65a18aa7702909c47b63c106
```
Here we are passing productId as a params to delete a specified Product.