const categoryRepository = require("../repository/category_repository");
const goodRepository = require("../repository/good_repository");

module.exports.checkCategoryId = async (id) => {
    return await categoryRepository.getCategoryById(id);
}
module.exports.checkCategoryGoods = async (id) => {
    return await goodRepository.getGoodsByCategory(id);
}