const cartService = require('../services/cart_service');

exports.showCartContent = async (req, resp) => {
    let cartContent = await cartService.checkCart(req.body.key, req.cookies.lang || 'en');
    cartContent = cartContent.map(cartElem => {
        if (cartElem.images instanceof Map) {
            cartElem.images = Object.fromEntries(cartElem.images);
        }
        return cartElem;
    });
    resp.json(cartContent);
 };

exports.orderPageRender = async (req, resp) => {
    resp.render('order.pug');
}