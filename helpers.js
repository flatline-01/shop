getDate = function (){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}.${day}.${year}`;
}

module.exports.createHtmlMessage = function (lang, name, email, receipt, phone, payment, address, rows, total){
    return `
<section>
    <p> 
    ${(lang === 'en') ? 
    `Hello, ${name}! Thank you for choosing our store.Your order has been received and will be processedafter payment confirmation.`:
    `Здравствуйте, ${name}! Спасибо, что выбрали наш магазин. Ваш заказ был получен и будет обработанпосле подтверждения оплаты.`}
    </p>
    <table>
        <tr>
            <th> ${(lang === 'en') ? 'Order details': 'Детали заказа'}</th>
        </tr>
        <tr>
            <td>${(lang === 'en') ? 'date of order:': 'дата заказа:'}</td>
            <td>${getDate()}</td>

            <td>e-mail:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>${(lang === 'en') ? 'method of receipt:' : 'способ получения:'}</td>
            <td>${receipt}</td>

            <td>${(lang === 'en') ? 'phone:' : 'телефон:'}</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>${(lang === 'en') ? 'method of payment:' : 'способ оплаты:'}</td>
            <td>${payment}</td>

            <td>${(lang === 'en') ? 'delivery address:' : 'адрес доставки:'}</td>
            <td>${address}</td>
        </tr>
    </table>
    <table style='margin-top: 2%;'>
        <thead>
            <tr>
                <th>${(lang === 'en') ? 'Good' : 'Товар'}</th>
                <th>${(lang === 'en') ? 'Count' : 'Количество'}</th>
                <th>${(lang === 'en') ? 'Price' : 'Цена'}</th>
                <th>${(lang === 'en') ? 'Total' : 'Итого'}</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
            <tr>
                <td></td>
                <td></td>
                <td>${(lang === 'en') ? 'Summ:' : 'Сумма:'}</td>
                <td>${total}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>${(lang === 'en') ? 'Deliveryman:' : 'Курьер:'}</td>
                <td>free</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>${(lang === 'en') ? 'Total:' : 'Итого:'}</td>
                <td>${total}</td>
            </tr>
        </tbody>
    </table>
    <p>${(lang === 'en') ? 
        'If you have some questions, reply to this message. Have a nice day!:)' : 
        'Если у вас есть вопросы, ответьте на это сообщение. Хорошего дня!:)'}
    </p>
</section>`;
}