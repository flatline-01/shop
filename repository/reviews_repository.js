const database = require('../database')
const Review = require('../models/Review');

const reviewsTableName = 'reviews';
const reviewsCols = ['name', 'text', 'evaluation', 'good_id'];

module.exports.getAllReviewsByGoodId = async (goodId) => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${reviewsTableName} where good_id = ?`, [goodId]);
        return !rows ? [] : rows.map((row) => { return new Review(row) });

    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}

module.exports.addReview = async (data) => {
    try {
        const connection = database.getConnection();
        connection.query(`INSERT INTO ${reviewsTableName} (${reviewsCols}) VALUES (?, ?, ?, ?)`, Object.values(data));

        return true;
    } catch (e) {
        throw new Error();
    }
}