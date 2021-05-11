module.exports = class Good {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id'] || null
        /** @type {String} */ this.name = props['name'] || null
        /** @type {Number} */ this.category = props['category'] || null
        /** @type {Number} */ this.cost = props['cost'] || null
    }
}

