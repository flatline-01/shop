const userRepository = require('../repository/user_repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.checkUserData = async (data) => {
    if(data){
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(data.password, salt);
       data.password = hash;
       return await userRepository.createUser(data);
    }
}

module.exports.checkUserEmailAndPass = async (data) => {
    if(data.email) {
        const acc = await userRepository.getUserByEmail(data.email);
        if(!acc && !bcrypt.compareSync(acc.password, data.password)){
            return false;
        }
        else {
            return true;
        }
    }
}