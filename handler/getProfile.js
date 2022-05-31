const AWS = require("aws-sdk");
const PROFILES_TABLE = process.env.PROFILES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.getProfile = (event, context, callback) => {
    const params = {
        TableName: PROFILES_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    dynamoDbClient.get(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        } else if (data.Item) {
            const res = {
                statusCode: 200,
                body: JSON.stringify(data.Item),
            }
            callback(null, res);
        } else {
            const res = {
                statusCode: 404,
                body: JSON.stringify({message: "Unable to find a profile fot that id."}),
            }
            callback(null, res);
        }
    })
}