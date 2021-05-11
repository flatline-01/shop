const goodRepository = require("../repository/good_repository");

module.exports.checkProductId = async (id) => {
    return await goodRepository.getGoodById(id);
}