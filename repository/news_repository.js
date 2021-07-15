const database = require('../database');
const News = require('../models/News');

const subscribersTableName = 'subscribers';
const newsTableName = 'news';

const subscribersCols = ['email'];

module.exports.getAllNews = async () => {
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

module.exports.getNewsById = async (newsId) => {
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
        let rows = await connection.query(`SELECT * FROM ${subscribersCols}`);
        for(let i = 0; i < rows.length; i++){
            if(rows[i] === data.email){
                return 'address already exist';
            }
            else{
                connection.query(`INSERT INTO  ${subscribersTableName}(${subscribersCols}) VALUES('${data.email}')`);
            }
        }
        return true;
    } catch (e) {
        throw new Error();
    }
}