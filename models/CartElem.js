module.exports = class CartElem {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id'] || null
        /** @type {String} */ this.name = props['name'] || null
        /** @type {Number} */ this.cost = props['cost'] || null
        /** @type {String}*/  this.image = props['image'] || null
        /** @type {String}*/  this.frame = props['frame'] || null
        /** @type {String}*/  this.color = props['color'] || null
    }
}