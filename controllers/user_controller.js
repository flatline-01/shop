const userService = require('../services/user_service.js');

module.exports.getSignUpPage = async (req, resp) => {
    resp.render('sign_up.pug');
}
module.exports.getLogInPage = async (req, resp) => {
    resp.render('log_in.pug');
}
module.exports.createUser = async (req, resp) => {
    let result = await userService.checkUserData(req.body);
    if(typeof result !== 'string'){
        resp.json(200);
    }
    resp.json(result);
}
module.exports.getUser = async (req, resp) => {
    let result = await userService.checkUserEmailAndPass(req.body);
    if(result !== null){
        resp.json(200);
    } else {
        resp.json(404);
    }
}