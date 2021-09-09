const orderService = require('../services/order_service');

exports.orderPageRender = async (req, resp) => {
    resp.render('order.pug');
}
exports.getData = async (req, resp) => {
    await orderService.getUserData(req.body, req.cookies.lang);
    resp.json('ok');
}