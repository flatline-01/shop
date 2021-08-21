module.exports = class User{
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.firstName = props['first_name']
        /** @type {String} */ this.lastName = props['last_name']
        /** @type {String} */ this.email = props['email']
        /** @type {String} */ this.password = props['password']
        /** @type {String} */ this.phone = props['phone']
    }
}