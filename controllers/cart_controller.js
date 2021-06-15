const cartService = require('../services/cart_service');

exports.showCartContent = async (req, resp) => {
     const cartContent = await cartService.checkCart(req.body.key);
     resp.send(cartContent);
 };

exports.orderPageRender = async (req, resp) => {
    resp.render('order.pug');
}