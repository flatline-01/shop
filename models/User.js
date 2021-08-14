module.exports = class User{
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {String} */ this.firstName = props['firstName']
        /** @type {String} */ this.lastName = props['lastName']
        /** @type {String} */ this.email = props['email']
        /** @type {String} */ this.password = props['password']
    }
}