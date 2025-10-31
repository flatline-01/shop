const goodService = require('../services/good_service');
const categoryService = require('../services/category_service');

module.exports.singleProduct = async (req, resp) => {
    let product =  await goodService.checkProductId(req.params.id, req.cookies.lang || 'en');
    if (product.images instanceof Map) {
        product.images = Object.fromEntries(product.images);
    }

    if(product !== null){
        const categoryId = product.categoryId;

        let category = await categoryService.checkCategoryId(categoryId, req.cookies.lang || 'en');
        category.goods = await categoryService.checkCategoryGoods(categoryId, req.cookies.lang || 'en');
        category.goods = category.goods.map(good => {
            if (good.images instanceof Map) {
                good.images = Object.fromEntries(good.images);
            }
            return good;
        });
        product.categoryName = category.name;
        product.otherCategoryGoods =  category.goods
        resp.render('product.pug', { product });
    } else {
        let errorCode = 404;
        let errorMessage = 'Page not found.';
        resp.render('error.pug',  {errorCode, errorMessage});
    }
};
