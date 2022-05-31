const AWS = require("aws-sdk");
const PROFILES_TABLE = process.env.PROFILES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteProfile = (event, context, callback) => {
    const params  = {
        TableName: PROFILES_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    dynamoDbClient.delete(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        } else {
            const res = {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Successfully deleted profile ${event.pathParameters.id}`,
                }),
            };
            callback(null, res);
        }
    })
}