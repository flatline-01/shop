const newsService = require('../services/news_service.js');


module.exports.getAllNews = async (req, resp) => {
    const news = await newsService.checkNews();
    resp.render('news.pug', { news });
}

module.exports.getSingleNews = async (req, resp) => {
    const  newsId = req.params.id;
    const news = await newsService.checkNewsId(newsId);
    resp.render('news-article.pug', { news });
}

module.exports.createSubscribe = async (req, resp) => {
    const data = req.body;
    resp.json('ok');
}