module.exports = class Category {
    constructor (props) {
        this.initialize(props)
    }

    initialize (props) {
        /** @type {Number} */ this.id = props['id']
        /** @type {String} */ this.name = props['name']
        /** @type {String} */ this.description = props['description']
        /** @type {String} */ this.sliderImage = props["slider_image"]
        /** @type {String} */ this.image = props["image"]
        /** @type {Array<Good>} */ this.goods = []
    }
}

