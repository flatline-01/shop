const goodRepository = require("../repository/good_repository");

module.exports.checkProductId = async (id, lang) => {
    return await goodRepository.getGoodById(id, lang);
}
module.exports.checkProductName = async (name, lang) => {
    return await goodRepository.getProductByName(name, lang);
}