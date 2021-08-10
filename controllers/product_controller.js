const goodService = require('../services/good_service');
const categoryService = require('../services/category_service');


module.exports.singleProduct = async (req, resp) => {
    let productId = req.params.id;
    let product =  await goodService.checkProductId(productId);

    const categoryId = product.categoryId;

    let category = await categoryService.checkCategoryId(categoryId);
    category.goods = await categoryService.checkCategoryGoods(categoryId);

    product.categoryName = category.name;

    product.otherCategoryGoods =  category.goods

    resp.render('product.pug', { product });
};
