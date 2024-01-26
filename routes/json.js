var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let my_file = await s3.getObject({
    Bucket: "cyclic-pear-eagle-yoke-eu-west-1",
    Key: "text.json",
  }).promise()
  
  const result = JSON.parse(my_file.Body)
  if (result == null) {
    res.json({
      status: "fail",
      message: "Unable to parse content from S3 object.",
    });
  }
  else {
    res.json({
      status: "success",
      result : result,
    });
  }
});

router.post('/', async function( req, res, next) {
  const {text} = req.body;
  const textObj = {
    text: text
  }
  await s3.putObject({
    Body: JSON.stringify(textObj),
    Bucket: "cyclic-pear-eagle-yoke-eu-west-1",
    Key: "text.json",
  }).promise()
  res.json({
    status: "success",
    text: text,
  });
});

module.exports = router;
