getDate = function (){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}.${day}.${year}`;
}

module.exports.createHtmlMessage = function (name, email, receipt, phone, payment, address, rows, total){
    return `
<section>
    <p>
        Hello,${name}! Thank you for choosing our store.
        Your order has been received and will be processed
        after payment confirmation.
    </p>
    <table>
        <tr>
            <th>Order details</th>
        </tr>
        <tr>
            <td>date of order:</td>
            <td>${getDate()}</td>

            <td>e-mail:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>method of receipt:</td>
            <td>${receipt}</td>

            <td>phone:</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>method of payment:</td>
            <td>${payment}</td>

            <td>delivery address:</td>
            <td>${address}</td>
        </tr>
    </table>
    <table style='margin-top: 2%;'>
        <thead>
            <tr>
                <th>Good</th>
                <th>Count</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
            <tr>
                <td></td>
                <td></td>
                <td>Summ:</td>
                <td>${total}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>Deliveryman:</td>
                <td>free</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>${total}</td>
            </tr>
        </tbody>
    </table>
    <p>If you have some questions, reply to this message. Have a nice day!:)</p>
</section>`;
}