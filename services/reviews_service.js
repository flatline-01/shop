const reviewsRepository = require('../repository/reviews_repository.js');

module.exports.checkProductId = async (id) => {
    return await reviewsRepository.getAllReviewsByGoodId(id);
}
module.exports.checkReviewData = async (data) => {
    if(data) return await reviewsRepository.addReview(data);
    else {
        throw new Error();
    }
}