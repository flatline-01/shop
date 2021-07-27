module.exports = class Review{
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id'] || null
        /** @type {String} */ this.name = props['name'] || null
        /** @type {String} */ this.text = props['text'] || null
        /** @type {Number}*/  this.evaluation = props['evaluation'] || null
        /** @type {Number}*/  this.good_id = props['good_id'] || null
    }
}