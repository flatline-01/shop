const database = require('../database')
const Review = require('../models/Review');

const reviewsTableName = 'reviews';
const reviewsCols = ['name', 'text', 'evaluation', 'good_id'];

module.exports.getAllReviewsByGoodId = async (goodId) => {
    try {
        let rows = (await database.query(`SELECT * FROM ${reviewsTableName} where good_id = $1`, [goodId])).rows;
        return !rows ? [] : rows.map((row) => { return new Review(row) });
    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}

module.exports.addReview = async (data) => {
    try {
        database.query(`INSERT INTO ${reviewsTableName} (${reviewsCols}) VALUES ($1, $2, $3, $4)`, Object.values(data));
        return true;
    } catch (e) {
        throw new Error();
    }
}