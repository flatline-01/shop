const goodRepository = require("../repository/good_repository");

module.exports.checkProductId = async (id) => {
    return await goodRepository.getGoodById(id);
}
module.exports.checkProductName = async (name) => {
    return await goodRepository.getProductByName(name);
}