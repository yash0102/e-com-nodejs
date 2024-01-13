const express = require("express");
const variantRouter = express.Router();
const variantController = require("./variants.controller")

variantRouter.post("/:productId",variantController.addVariant);
variantRouter.patch("/:variantId",variantController.updateVariant);
variantRouter.get("/:productId",variantController.getVariantById);
variantRouter.delete("/:productId",variantController.deleteVariantById);

module.exports = variantRouter;