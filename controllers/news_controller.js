const newsService = require('../services/news_service.js');


module.exports.getAllNews = async (req, resp) => {
    const news = await newsService.checkNews();
    console.log(news);
    resp.render('news.pug', { news });
}

module.exports.getSingleNews = async (req, resp) => {
    const  newsId = req.params.id;
    const news = await newsService.checkNewsId(newsId);
    resp.render('news-article.pug', { news });
}

module.exports.addSubscriber = async (req, resp) => {
    const data = req.body;
    let answer = await newsService.checkNewsSubscriber(data);
    resp.json(answer);
}

module.exports.removeSubscriber = async (req, resp) => {
    console.log(req.body)
    const data = req.body;
    let answer = await newsService.checkRemovingNewsSubscriber(data);
    console.log(answer);
    resp.json(answer);
}