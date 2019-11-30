var AWS = require('aws-sdk');
var s3 = new AWS.S3({endpoint: 'https://s3.filebase.com'});

s3.listBuckets(function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});
