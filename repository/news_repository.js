const database = require('../database');
const News = require('../models/News');

const subscribersTableName = 'subscribers';
let newsTableName;

const subscribersCols = ['email'];

module.exports.getAllNews = async (lang) => {
    if(lang === 'en') {
        newsTableName = 'news';
    } else {
        newsTableName = 'news_ru';
    }
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${newsTableName}`);

        return !rows ? []
            : rows.map((row) => { return new News(row) });

    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch news');
    }
}

module.exports.getNewsById = async (newsId, lang) => {
    if(lang === 'en') {
        newsTableName = 'news';
    } else {
        newsTableName = 'news_ru';
    }
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${newsTableName} where id = ? `,
            [newsId]);

        return (rows && rows.length > 0) ? new News(rows[0])
            : null;

    } catch (e) {
        console.log(`Unable to fetch goods for goodId=${newsId} from database: ${e}`)
        throw new Error('Unable to fetch news');
    }
}

module.exports.createSubscriber = async (data) => {
    try {
        const connection = database.getConnection();
        await connection.query(`INSERT INTO  ${subscribersTableName}(${subscribersCols}) VALUES(?)`, [data.email]);
        return true;
    } catch (e) {
        throw new Error();
    }
}

module.exports.removeSubscriber = async (data) => {
    try {
        const connection = database.getConnection();
        await connection.query(`DELETE FROM ${subscribersTableName} WHERE email = ?`, [data.email]);
        return true;
    } catch (e) {
        throw new Error();
    }
}

module.exports.getNewsByName = async (title, lang) => {
    if(lang === 'en') {
        newsTableName = 'news';
    } else {
        newsTableName = 'news_ru';
    }
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${newsTableName} WHERE title LIKE CONCAT('%', ?,  '%')`, [title]);
        return !rows ? []
            : rows.map((row) => { return new News(row) });

    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch news');
    }
}