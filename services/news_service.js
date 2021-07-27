const newsRepository = require('../repository/news_repository.js');

module.exports.checkNews = async () => {
    return await newsRepository.getAllNews();
}
module.exports.checkNewsId = async (id) => {
    return await newsRepository.getNewsById(id);
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