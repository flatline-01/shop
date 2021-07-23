const database = require('../database')
const Good = require("../models/Good");

const goodsTableName = 'goods';
const goodsImagesTableName = 'good_images';

module.exports.getAllGoods = async () => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${goodsTableName}`);

        for(let i = 0; i < rows.length; i++){
            let images = await connection.query(`SELECT color, images FROM ${goodsImagesTableName} where good_id = ? `, rows[i].id);
            rows[i].images = JSON.parse(JSON.stringify(images));
        }

        return !rows ? []
            : rows.map((row) => {  return new Good(row) });

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

        let images = await connection.query(`SELECT color, images FROM ${goodsImagesTableName} where good_id = ? `,[goodId]);
        rows[0].images = JSON.parse(JSON.stringify(images));

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
        let rows = await connection.query(`SELECT * FROM ${goodsTableName} where categoryId = ? `,
            [categoryId]);
        for(let i = 0; i < rows.length; i++){
            let images = await connection.query(`SELECT color, images FROM ${goodsImagesTableName} where good_id = ? `, rows[i].id);
            rows[i].images = JSON.parse(JSON.stringify(images));
        }

        return !rows ? []
            : rows.map((row) => { return new Good(row)});

    } catch (e) {
        console.log(`Unable to fetch goods for categoryId=${categoryId} from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}
