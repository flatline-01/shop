const reviewsService = require('../services/reviews_service.js');

module.exports.getGoodReviews = async (req, resp) => {
    let productId = req.params.id;
    let reviews =  await reviewsService.checkProductId(productId);

    resp.render('reviews.pug', { reviews });
};

module.exports.addGoodReview = async (req, resp) => {
    let result = await reviewsService.checkReviewData(req.body);
    resp.json(result);
}