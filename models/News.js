module.exports = class News{
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id'] || null
        /** @type {String} */ this.title = props['title'] || null
        /** @type {String} */ this.text = props['text'] || null
        /** @type {String}*/  this.image = props['image'] || null
        /** @type {Date}*/    this.date = props['date'] || null
    }
}