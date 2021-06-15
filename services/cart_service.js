const cartRepository = require('../repository/cart_repository');

module.exports.checkCart = async (goodsIDs) => {
    if(Array.isArray(goodsIDs)) return await cartRepository.getGoods(goodsIDs);
}