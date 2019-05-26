const aws = require('aws-sdk');
const AWS_APP_REGION = process.env.AWS_APP_REGION;

aws.config.update({
  accessKeyId: "AKIAZTLQRQW2HMDAMEM5",
  secretAccessKey: "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",
  region: AWS_APP_REGION,
  endpoint: "lambda.ap-southeast-2.amazonaws.com"
});

/**
 * Enabling Offline Development
 *
 * @author Jacktator
 * @since 1.0.0
 */
let dynamoDB;
if (process.env.IS_OFFLINE) {
  dynamoDB = new aws.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
  // console.log(dynamoDB);
} else {
  dynamoDB = new aws.DynamoDB.DocumentClient();
}

export default dynamoDB;
