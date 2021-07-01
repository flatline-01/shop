module.exports = class Shopper{
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.firstName = props['firstName']
        /** @type {String} */ this.lastName = props['lastName']
        /** @type {String} */ this.email = props['email']
        /** @type {String} */ this.phone = props['phone']
        /** @type {String} */ this.address = props['address']
        /** @type {String} */ this.city = props['city']
        /** @type {String} */ this.payment = props['payment']
        /** @type {String} */ this.delivery = props['delivery']
        /** @type {Object} */ this.cart = props['cart']
    }
}
