var AWS = require('aws-sdk');
var s3 = new AWS.S3({endpoint: 'https://s3.filebase.com'});

s3.listBuckets(function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    var params = {
      Body: 'Hello, world!',
      Bucket: data['Buckets'][0]['Name'],
      Key: 'exampleobject',
      ContentType: 'text/plain',
      Metadata: {
       'metadata1': 'value1',
       'metadata2': 'value2'
      }
    };
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }
});
