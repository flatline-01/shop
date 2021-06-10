const database = require('../database');
const CartElem = require('../models/CartElem');

const goodsTableName = 'goods';
const goodsTableFields = ['name', 'cost', 'id', 'image', 'frame'];

module.exports.getGoods = async function(req, resp) {
  try{
      const connection = database.getConnection();
      if(req.body.key !== undefined && req.body.key.length !== 0){
          let result  =  await  connection.query(`SELECT ${goodsTableFields.join(',')} FROM ${goodsTableName} WHERE id IN(${req.body.key.join(',')})`);
          return result.map( i => new CartElem(i));
      }
      else{
          return {text: 'cart is empty'};
      }
  } catch(e){
      console.log(e);
  }
 }