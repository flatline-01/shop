getDate = function (){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}.${day}.${year}`;
}

module.exports.createHtmlMessage = function (lang, name, email, receipt, phone, payment, address, rows, total){
    let condition = (lang === 'en' || lang == undefined)
    return `
<section>
    <p> 
    ${condition ? 
    `Hello, ${name}! Thank you for choosing our store.Your order has been received and will be processedafter payment confirmation.`:
    `Здравствуйте, ${name}! Спасибо, что выбрали наш магазин. Ваш заказ был получен и будет обработан после подтверждения оплаты.`}
    </p>
    <table>
        <tr>
            <th> ${condition ? 'Order details': 'Детали заказа'}</th>
        </tr>
        <tr>
            <td>${condition ? 'date of order:': 'дата заказа:'}</td>
            <td>${getDate()}</td>

            <td>e-mail:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>${condition ? 'method of receipt:' : 'способ получения:'}</td>
            <td>${receipt}</td>

            <td>${condition ? 'phone:' : 'телефон:'}</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>${condition ? 'method of payment:' : 'способ оплаты:'}</td>
            <td>${payment}</td>

            <td>${condition ? 'delivery address:' : 'адрес доставки:'}</td>
            <td>${address}</td>
        </tr>
    </table>
    <table style='margin-top: 2%;'>
        <thead>
            <tr>
                <th>${condition ? 'Good' : 'Товар'}</th>
                <th>${condition ? 'Count' : 'Количество'}</th>
                <th>${condition ? 'Price' : 'Цена'}</th>
                <th>${condition ? 'Total' : 'Итого'}</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
            <tr>
                <td></td>
                <td></td>
                <td>${condition ? 'Summ:' : 'Сумма:'}</td>
                <td>${total}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>${condition ? 'Deliveryman:' : 'Курьер:'}</td>
                <td>free</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>${condition ? 'Total:' : 'Итого:'}</td>
                <td>${total}</td>
            </tr>
        </tbody>
    </table>
    <p>${condition ? 
        'If you have some questions, reply to this message. Have a nice day! :)' : 
        'Если у вас есть вопросы, ответьте на это сообщение. Хорошего дня! :)'}
    </p>
</section>`;
}