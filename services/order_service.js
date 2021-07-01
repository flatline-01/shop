const mail = require('../mailer.js');
const helpers = require('../helpers.js');
const Shopper = require('../models/Shopper.js');
const cartRepository = require('../repository/cart_repository');

exports.getUserData = async (data) => {
    const shopper = new Shopper(data);
    let cart = JSON.parse(shopper.cart);
    let goodsData = await getGoodsData(cart);
    let rows =  goodsData[0];
    let total = goodsData[1];
    const message = helpers.createHtmlMessage(shopper.firstName, shopper.email, shopper.delivery, shopper.phone, shopper.payment, shopper.address, rows, total);
    sendMessage(process.env.MAIL_HOST, process.env.MAIL_USER, shopper.email, message);
}

function sendMessage(host, from, to, message){
    const mailer = mail.createTransport();
    mailer.sendMail({
        pool: true,
        host: host,
        port: 465,
        secure: true,
        from: from,
        to: to,
        subject: 'Streetster',
        html: message
    });
}

async function getGoodsData(cart){
    const ids = Object.keys(cart);
    const goods = await cartRepository.getGoods(ids);
    let rows = [];
    let total = 0;
    for(let i of goods){
        total+= +i['cost'] * +cart[i['id']];
        let row = `
        <tr>
            <td>${i['name']}</td>
            <td>${cart[i['id']]}</td>
            <td>${i['cost']}</td>
            <td>${+i['cost'] * +cart[i['id']]}</td>
        </tr>
        `;
        rows.push(row);
    }
    return [rows.join(''), total];
}