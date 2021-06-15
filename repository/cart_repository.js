const database = require('../database');
const CartElem = require('../models/CartElem');

const goodsTableName = 'goods';
const goodsTableFields = ['name', 'cost', 'id', 'image', 'frame'];


module.exports.getGoods = async function(goodsIDs) {
    if (goodsIDs !== undefined && goodsIDs.length !== 0) {
        try {
            const connection = database.getConnection();
            let result = await connection.query(`SELECT ${goodsTableFields.join(',')} FROM ${goodsTableName} WHERE id IN(?)`, [goodsIDs]);
            return result.map(i => new CartElem(i));
        } catch (e) {
            return [];
        }
    }
    else return [];
}