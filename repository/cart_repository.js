const database = require('../database');
const CartElem = require('../models/CartElem');

const goodsTableName = 'goods';
const goodsImagesTableName = 'good_images';

module.exports.getGoods = async function(goodsIDs) {
    if (goodsIDs !== undefined && goodsIDs.length !== 0) {
        try {
            const connection = database.getConnection();
            let result = await connection.query(`SELECT * FROM ${goodsTableName} WHERE id IN(?)`, [goodsIDs]);

            for(let i = 0; i < result.length; i++){
                let images = await connection.query(`SELECT color, images FROM ${goodsImagesTableName} where good_id = ? `, result[i].id);
                result[i].images = JSON.parse(JSON.stringify(images));
            }

            return result.map( i => new CartElem(i) );
        } catch (e) {
            return [];
        }
    }
    else return [];
}