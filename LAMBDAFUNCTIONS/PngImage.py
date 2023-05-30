const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
const s3 = new AWS.S3();

const uploadBucket = 'dalphotosharing'   

exports.handler = async (event) => {
  const result = await getUploadURL()
  return result
};

const getUploadURL = async function() {
  
  let actionId = Date.now()

  var s3Params = {
    Bucket: uploadBucket,
    Key:  `${actionId}.png`,
    ContentType: 'image/png',

  };

  return new Promise((resolve, reject) => {

    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "uploadURL": uploadURL,
          "photoFilename": `${actionId}.png`
      })
    })
  })
}
