const categoryService = require("../services/category_service");

exports.singleCategory = async (req, resp) => {
    let categoryId = req.params.id;

    let category = await categoryService.checkCategoryId(categoryId);
    category.goods = await categoryService.checkCategoryGoods(categoryId);

    resp.render("category.pug", { category });

};
