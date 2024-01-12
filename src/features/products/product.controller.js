const Products = require('./product.model.js');
const Variants = require("../variants/variants.model.js")

module.exports.addProduct = async (req ,res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).send("Please enter the required fields");
        } else {
            const isExist = await Products.findOne({ name: name });
            if (isExist) {
                return res.status(400).send("The Product is already exist")
            } else {
                const result = await Products.create({ name, description, price })
                return res.status(200).send(result)
            }
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const body = req.body;
        const isExist = await Products.findById(productId);

        if (!isExist) {
            return res.status(400).send("Product Not found ..")
        } else {
            await Products.findOneAndUpdate(
                { _id: productId },
                body,
                { new: true }
            )
            return res.status(200).send("Product Added Successfully..")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({})

        if (products.length == 0) {
            return res.status(400).send("No Products Found..");
        } else {
            return res.status(200).send(products)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const products = await Products.findById(id);
        if (!products) {
            return res.status(400).send("No Product Found");
        } else {
            return res.status(200).send(products)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.searchProducts = async (req, res) => {
    console.log("inside search");
    try{
        const {text} = req.query
        if(!text){
            return res.status(400).send('The text not found')
        }else{
            const products = await Products.find({
                $or: [
                    { name: { $regex: text, $options: 'i' } },
                    { description: { $regex: text, $options: 'i' } }, 
                ],
            })
            if(products.length>0){
                return res.status(200).send(products)
            }else{
                return res.status(400).send('No Products Found ..')
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });    
    }
}

module.exports.deleteProductById = async (req, res) => {
    try {
        const id = req.params.id
        const variants = await Variants.deleteMany({ product: id })
        const product = await Products.findByIdAndDelete(id);

        if (variants.deletedCount > 0 || product) {
            return res.status(200).send('product and there variants are deleted')
        } else {
            return res.status(400).send('Product or variants not found .')
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


