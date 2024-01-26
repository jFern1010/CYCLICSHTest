var express = require('express');
var router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.CYCLIC_DB)
let dishes = db.collection('dishes')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let list = await dishes.list();
  res.send(list);
});

router.get('/:dishKey', async function(req, res ,next) {
  let item = await dishes.get(req.params.dishKey);
  res.send(item);
});

router.post('/', async function(req, res, next) {
  const {name, country} = req.body;
  await dishes.set(name, {
    country: country
  })
  res.end();
});

module.exports = router;
