const database = require('../database');
const News = require('../models/News');
const subscribersTableName = 'subscribers';
const subscribersCols = ['email'];

module.exports.getAllNews = async (lang) => {
    let newsTableName = getActualNewsTableName(lang);
    try {
        let rows = (await database.query(`SELECT * FROM ${newsTableName}`)).rows;
        if (rows) {
            rows.forEach((row) => {
                row["image"] = convertToBase64(row["image"]);
            });
        }
        return !rows ? [] : rows.map((row) => { return new News(row) });
    } catch (e) {
        console.log(`Unable to fetch news from database: ${e}`);
        throw new Error('Unable to fetch news');
    }
}

module.exports.getNewsById = async (newsId, lang) => {
    let newsTableName = getActualNewsTableName(lang);
    try {
        let rows = (await database.query(`SELECT * FROM ${newsTableName} where id = $1 `, [newsId])).rows;
        if (rows) {
            rows.forEach((row) => {
                row["image"] = convertToBase64(row["image"]);
            });
        }
        return (rows && rows.length > 0) ? new News(rows[0]) : null;
    } catch (e) {
        console.log(`Unable to fetch news for newsId=${newsId} from database: ${e}`)
        throw new Error('Unable to fetch news');
    }
}

module.exports.createSubscriber = async (data) => {
    try {
        await database.query(`INSERT INTO  ${subscribersTableName}(${subscribersCols}) VALUES($1)`, [data.email]);
        return true;
    } catch (e) {
        throw new Error();
    }
}

module.exports.removeSubscriber = async (data) => {
    try {
        await database.query(`DELETE FROM ${subscribersTableName} WHERE email = $1`, [data.email]);
        return true;
    } catch (e) {
        throw new Error();
    }
}

module.exports.getNewsByName = async (title, lang) => {
    let newsTableName = getActualNewsTableName(lang);
    try {
        let rows = (await database.query(`SELECT * FROM ${newsTableName} WHERE LOWER(title) LIKE '%' || \$1 || '%'`, [title])).rows;
        if (rows) {
            rows.forEach((row) => {
                row["image"] = convertToBase64(row["image"]);
            });
        }
        return !rows ? [] : rows.map((row) => { return new News(row) });
    } catch (e) {
        console.log(`Unable to fetch news from database: ${e}`);
        throw new Error('Unable to fetch news');
    }
}

function getActualNewsTableName(lang) {
    return (lang === 'en' || lang === undefined) ? 'news' : 'news_ru';
}

function convertToBase64(imageBuffer) {
    if (!imageBuffer) {
        return null;
    }
    return imageBuffer.toString('base64');
}