const categoryService = require("../services/category_service");

exports.singleCategory = async (req, resp) => {
    let category = await categoryService.checkCategoryId(req.params.id, req.cookies.lang || 'en');

    if(category !== null){
        category.goods = await categoryService.checkCategoryGoods(req.params.id, req.cookies.lang || 'en');
        resp.render("category.pug", { category });
    } else {
        let errorCode = 404;
        let errorMessage = 'Page not found.';
        resp.render('error.pug',  {errorCode, errorMessage});
    }


};

exports.getAllCategories = async (req, resp) =>  {
    let categories = await categoryService.checkCategories(req.cookies.lang || 'en');

    for(let i = 0; i < categories.length; i++){
        categories[i].goods = await categoryService.checkCategoryGoods(i+1, req.cookies.lang || 'en');
    }

    resp.render('categories.pug',{ categories });
}