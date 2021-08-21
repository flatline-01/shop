const userService = require('../services/user_service.js');

module.exports.getSignUpPage = async (req, resp) => {
    resp.render('sign_up.pug');
}
module.exports.getLogInPage = async (req, resp) => {
    resp.render('log_in.pug');
}
module.exports.createUser = async (req, resp) => {
    let result = await userService.checkUserData(req.body);
    let user = await userService.checkUserEmailAndPass(req.body);
    resp.json(user);
}
module.exports.getUser = async (req, resp) => {
    let result = await userService.checkUserEmailAndPass(req.body);
    if(result !== null){
        resp.json(result);
    } else {
        resp.json(404);
    }
}