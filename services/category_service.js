const categoryRepository = require('../repository/category_repository');
const goodRepository = require('../repository/good_repository');

module.exports.checkCategoryId = async (id, lang) => {
    return await categoryRepository.getCategoryById(id, lang);
}
module.exports.checkCategoryGoods = async (id, lang) => {
    return await goodRepository.getGoodsByCategory(id, lang);
}
module.exports.checkCategories = async (lang) => {
    return await categoryRepository.getAllCategories(lang);
}
module.exports.checkCategoryName = async (name, lang) => {
    return await categoryRepository.getCategoryByName(name, lang);
}