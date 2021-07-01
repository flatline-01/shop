const nodemailer = require('nodemailer');
const util = require('util');

const mailOptions = {
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
}

module.exports.createTransport = () => {
    const transporter = nodemailer.createTransport(mailOptions);
    return{
        sendMail(data){
            return util.promisify(transporter.sendMail).call(transporter, data)
        }
    }
}
