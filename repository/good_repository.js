const database = require('../database')
const Good = require("../models/Good");

const goodsTableName = 'goods';

module.exports.getAllGoods = async () => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${goodsTableName}`);

        return !rows ? []
            : rows.map((row) => { return new Good(row) });

    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}

module.exports.getGoodById = async (goodId) => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${goodsTableName} where id = ? `,
            [goodId]);

        return (rows && rows.length > 0) ? new Good(rows[0])
            : null;

    } catch (e) {
        console.log(`Unable to fetch goods for goodId=${goodId} from database: ${e}`)
        throw new Error('Unable to fetch goods')
    }
}

module.exports.getGoodsByCategory = async (categoryId) => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${goodsTableName} where category = ? `,
            [categoryId]);

        return !rows ? []
            : rows.map((row) => { return new Good(row) });

    } catch (e) {
        console.log(`Unable to fetch goods for categoryId=${categoryId} from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}


