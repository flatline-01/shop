const cartRepository = require('../repository/cart_repository');

module.exports.checkCart = async (goodsIDs, lang) => {
    if(Array.isArray(goodsIDs)) return await cartRepository.getGoods(goodsIDs, lang);
}