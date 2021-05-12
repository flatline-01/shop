module.exports = class Good {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id'] || null
        /** @type {String} */ this.name = props['name'] || null
        /** @type {Number} */ this.category = props['category'] || null
        /** @type {Number} */ this.cost = props['cost'] || null
        /** @type {String}*/  this.image = props['image'] || null
        /** @type {String}*/  this.description = props['description'] || null
        /** @type {String} */ this.growth = props['growth'] || null
        /** @type {String}*/  this.frame = props['frame'] || null
        /** @type {String}*/  this.wheel = props['wheel'] || null
        /** @type {String}*/  this.color = props['color'] || null
    }
}

