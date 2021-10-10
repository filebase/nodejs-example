const AWS = require('aws-sdk');
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});

s3.listBuckets(function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    var params = {
      Bucket: data['Buckets'][0]['Name'], // I suggest you edit this to a string
      CORSConfiguration: 
      {
		CORSRules: 
		[
	      {
		      AllowedHeaders: ["*"],
		      AllowedMethods: ["PUT", "POST"],
		      AllowedOrigins: ["*"]
	      },
	      {
    	    AllowedMethods: ["GET"],
    	    AllowedOrigins: ["*"]
   	      }
   	      ]
   	  }
   	};
    s3.putBucketCors(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log("Success! Edited CORS on:", params.Bucket);
      }
    });
  }
});
