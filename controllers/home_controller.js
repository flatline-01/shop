const categoryService = require('../services/category_service');
const newsService = require('../services/news_service');
const goodService = require('../services/good_service');

exports.homePage = async (req, resp) => {
    let categories = await categoryService.checkCategories(req.cookies.lang || 'en');

    for(let i = 0; i < categories.length; i++){
        let category = categories[i];

        category.goods = await categoryService.checkCategoryGoods(i+1, req.cookies.lang || 'en');
    }
    let news = await newsService.checkNews();
    resp.render('main.pug', { categories, news });
};

exports.liveSearch = async (req, resp) => {
    let finderCategories = await categoryService.checkCategoryName(req.body.search_aim, req.cookies.lang || 'en');
    let finderGoods = await goodService.checkProductName(req.body.search_aim, req.cookies.lang || 'en');
    let finderNews = await newsService.checkNewsTitle(req.body.search_aim, req.cookies.lang || 'en');

    resp.json({
        categories: finderCategories,
        goods: finderGoods,
        news: finderNews
    });
}