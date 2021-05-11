const goodRepository = require("../repository/good_repository")

exports.homePage = async (req, resp) => {
    // Вот тут надо обрабатывать ошибки и отдавать на клиент красивую страницу с описанием типа "Упс.. мы сломались"
    const goods = await goodRepository.getAllGoods()
    resp.render('main.pug', {
        goods: goods
    });
};
