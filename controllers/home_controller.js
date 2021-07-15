const categoryService = require("../services/category_service");
const newsService = require('../services/news_service');

exports.homePage = async (req, resp) => {
    let categories = await categoryService.checkCategories();

    for(let i = 0; i < categories.length; i++){
        let category = categories[i];

        category.goods = await categoryService.checkCategoryGoods(i+1);
    }
    let news = await newsService.checkNews();
    resp.render('main.pug', { categories, news });
};
