const cartRepository = require('../repository/cart_repository');

module.exports.checkCart = async (req) => {
    return await cartRepository.getGoods(req);
}