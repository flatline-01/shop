const goodService = require("../services/good_service");

module.exports.singleProduct = async (req, resp) => {
    let productId = req.params.id;
    let product =  await goodService.checkProductId(productId);

    resp.render("product.pug", { product });
};
