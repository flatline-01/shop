const categoryService = require("../services/category_service");

exports.homePage = async (req, resp) => {
    let categories = await categoryService.checkCategories();

    for(let i = 0; i < categories.length; i++){
        let category = categories[i];

        category.goods = await categoryService.checkCategoryGoods(i+1);
    }
    resp.render('main.pug', { categories});
};
