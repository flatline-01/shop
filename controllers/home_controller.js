const categoryService = require("../services/category_service");
const newsService = require('../services/news_service');
const goodService = require("../services/good_service");

exports.homePage = async (req, resp) => {
    let categories = await categoryService.checkCategories();

    for(let i = 0; i < categories.length; i++){
        let category = categories[i];

        category.goods = await categoryService.checkCategoryGoods(i+1);
    }
    let news = await newsService.checkNews();
    resp.render('main.pug', { categories, news });
};

exports.liveSearch = async (req, resp) => {
    let finderCategories = await categoryService.checkCategoryName(req.body.search_aim);
    let finderGoods = await goodService.checkProductName(req.body.search_aim);
    let finderNews = await newsService.checkNewsTitle(req.body.search_aim);

    resp.json({
        categories: finderCategories,
        goods: finderGoods,
        news: finderNews
    });
}