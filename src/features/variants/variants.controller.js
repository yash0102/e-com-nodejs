const Products = require('../products/product.model.js');
const Variants = require("../variants/variants.model.js")
const skuGenerate = require('../../middlewares/sku.middleware.js');

module.exports.addVariant = async (req ,res) => {
    try {
        const prodId = req.params.productId;
        const { name, additional_cost } = req.body

        if (!name || !additional_cost) {
            return res.status(400).send("Please fill the required details..")
        } else {
            const product = await Products.findById(prodId)
            if (!product) {
                return  res.status(400).send("the product is not valid ")
            } else {
                const isNameFound = await Variants.findOne({ name: name });
                if (isNameFound) {
                    return res.status(400).send("Variant Name is already used..")
                } else {
                    await Products.findByIdAndUpdate(prodId, { $inc: { variants: 1 } })
                    const str = await skuGenerate();
                    const result = await Variants.create({
                        sku: str,
                        product: prodId,
                        ...req.body
                    })
                    return res.status(200).send(result);
                }
            }
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.updateVariant = async (req, res) => {
    try {
        const id = req.params.variantId;
        const body = req.body;

        // field should not be updated or modified during update operation
        delete body.product
        delete body.sku

        const result = await Variants.findByIdAndUpdate(id, body, { new: true });

        if (!result) {
            return res.status(400).send("cannot find variant")
        } else {
            res.status(200).send(result)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getVariantById = async (req, res) => {
    try {
        const prodId = req.params.productId;
        const items = await Variants.find({ product: prodId });
        if (items.length == 0) {
            return res.status(400).send("variants not found..")
        } else {
            return res.status(200).send(items)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.deleteVariantById = async (req, res) => {
    try {
        const variantId = req.params.variantId;
        const item = await Variants.findByIdAndDelete(variantId);

        if (!item) {
            return res.status(400).send("variants not found..")
        } else {
            return res.status(200).send("Variants has been deleted")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}


