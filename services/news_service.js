const newsRepository = require('../repository/news_repository.js');

module.exports.checkNews = async (lang) => {
    return await newsRepository.getAllNews(lang);
}
module.exports.checkNewsId = async (id, lang) => {
    return await newsRepository.getNewsById(id, lang);
}
module.exports.checkNewsSubscriber = async (data) => {
    if(data) return await newsRepository.createSubscriber(data);
    else {
        throw new Error();
    }
}
module.exports.checkRemovingNewsSubscriber = async (data) => {
    if(data) return await newsRepository.removeSubscriber(data);
    else {
        throw new Error();
    }
}
module.exports.checkNewsTitle = async (title, lang) => {
    return await  newsRepository.getNewsByName(title, lang);
}