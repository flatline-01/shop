const categoryService = require("../services/category_service");

exports.singleCategory = async (req, resp) => {
    let categoryId = req.params.id;

    let category = await categoryService.checkCategoryId(categoryId);

    if(category !== null){
        category.goods = await categoryService.checkCategoryGoods(categoryId);
        resp.render("category.pug", { category });
    } else {
        let errorCode = 404;
        let errorMessage = 'Page not found.';
        resp.render('error.pug',  {errorCode, errorMessage});
    }


};

exports.getAllCategories = async (req, resp) =>  {
    let categories = await categoryService.checkCategories();

    for(let i = 0; i < categories.length; i++){
        categories[i].goods = await categoryService.checkCategoryGoods(i+1);
    }

    resp.render('categories.pug',{ categories });
}