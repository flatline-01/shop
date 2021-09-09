const express = require('express');
const router = express.Router();

const HomeController = require('./controllers/home_controller');
const ProductController = require('./controllers/product_controller');
const CategoryController = require('./controllers/category_controller');
const CartController = require('./controllers/cart_controller');
const OrderController = require('./controllers/order_controller');
const NewsController = require('./controllers/news_controller.js');
const ReviewsController = require('./controllers/reviews_controller.js');
const UserController = require('./controllers/user_controller');

/** Main routes */
router.get('/', HomeController.homePage);

router.post('/', (req, resp) => HomeController.liveSearch(req, resp));

/** Product routes */
router.get('/product/:id', ProductController.singleProduct);

/** Category routes */
router.get('/categories',(req, resp) =>  CategoryController.getAllCategories(req, resp));

router.get('/category/:id', CategoryController.singleCategory);

/** Cart routes */
router.post('/cart', (req, resp) => CartController.showCartContent(req, resp));

router.get('/cart', CartController.orderPageRender);

router.get('/order', OrderController.orderPageRender);

router.post('/order', (req, resp) => OrderController.getData(req, resp));

/** News routes **/
router.get('/news', (req, resp) => NewsController.getAllNews(req, resp));

router.get('/news/:id', (req, resp) => NewsController.getSingleNews(req, resp));

router.get('/subscribe', (req, resp) => HomeController.homePage(req, resp));

router.post('/subscribe', (req, resp) => NewsController.addSubscriber(req, resp));

router.get('/unsubscribe', (req, resp) => HomeController.homePage(req, resp));

router.post('/unsubscribe', (req, resp) => NewsController.removeSubscriber(req, resp));


/** Reviews routes **/
router.get('/reviews/:id', (req, resp) => ReviewsController.getGoodReviews(req, resp));

router.post('/reviews/:id', (req, resp) => ReviewsController.addGoodReview(req, resp));

/** Register routes **/
router.get('/sign_up', (req, resp) => UserController.getSignUpPage(req, resp));
router.post('/sign_up', (req, resp) => UserController.createUser(req, resp));

router.get('/log_in', (req, resp) => UserController.getLogInPage(req, resp));
router.post('/log_in', (req, resp) => UserController.getUser(req, resp));

module.exports = router;
