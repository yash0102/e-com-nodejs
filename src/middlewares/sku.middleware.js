const randomString = require("randomstring");
const Variants = require("../features/variants/variants.model.js");

const skuGenerate = async ()=>{
    const str  = randomString.generate(10);
    const isUsed = await Variants.findOne( { sku : str } )

    if(isUsed){
        return skuGenerate()
    }else{
        return str
    }
}


module.exports = skuGenerate