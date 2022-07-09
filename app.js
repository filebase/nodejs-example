var AWS = require('aws-sdk');
var s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});

//retrieve list of buckets
s3.listBuckets(async function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {

    //define parameters
    var params = {
      Body: 'Hello, world! :)',
      Bucket: data['Buckets'][0]['Name'],
      Key: 'exampleobject',
      ContentType: 'text/plain',
      Metadata: {
       'metadata1': 'value1',
       'metadata2': 'value2'
      }
    };

    //upload
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });

    //waiting for the file to be uploaded, and it usually takes less than 5 seconds
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(5000);

    //redefine parameters
    var params = {
        Key: 'exampleobject',
        Bucket: data['Buckets'][0]['Name']
        }

    //download
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
          console.log('File content: ' + Buffer.from(data.Body, 'utf8').toString());
        }
    });
  }
});
