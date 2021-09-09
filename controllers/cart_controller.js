const cartService = require('../services/cart_service');

exports.showCartContent = async (req, resp) => {
     const cartContent = await cartService.checkCart(req.body.key, req.cookies.lang || 'en');
     resp.json(cartContent);
 };

exports.orderPageRender = async (req, resp) => {
    resp.render('order.pug');
}