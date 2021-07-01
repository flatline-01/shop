const orderService = require('../services/order_service');

exports.orderPageRender = async (req, resp) => {
    resp.render('order.pug');
}
exports.getData = async (req, resp) => {
    let data = await orderService.getUserData(req.body);
    resp.json('ok');
}