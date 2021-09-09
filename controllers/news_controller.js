const newsService = require('../services/news_service.js');

module.exports.getAllNews = async (req, resp) => {
    const news = await newsService.checkNews(req.cookies.lang || 'en');
    resp.render('news.pug', { news });
}

module.exports.getSingleNews = async (req, resp) => {
    const news = await newsService.checkNewsId( req.params.id, req.cookies.lang || 'en');
    if(news){
        resp.render('news-article.pug', { news });
    } else {
        let errorCode = 404;
        let errorMessage = 'Page not found.';
        resp.render('error.pug',  {errorCode, errorMessage});
    }
}

module.exports.addSubscriber = async (req, resp) => {
    const data = req.body;
    let answer = await newsService.checkNewsSubscriber(data);
    resp.json(answer);
}

module.exports.removeSubscriber = async (req, resp) => {
    const data = req.body;
    let answer = await newsService.checkRemovingNewsSubscriber(data);
    resp.json(answer);
}