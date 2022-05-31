const AWS = require("aws-sdk");
const PROFILES_TABLE = process.env.PROFILES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.updateProfile = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const { name, title, bio } = JSON.parse(event.body);
    
    if (typeof name !== 'string'|| typeof title !== 'string' || typeof bio !== 'string') {
        console.error('Validation has failed')
        callback(new Error('Unable to create profile due to validation failure'));
        return;
    }

    const params = {
        TableName: PROFILES_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeNames: { "#pn": "name" },
        ExpressionAttributeValues: {
            ":profileName": name,
            ":title": title,
            ":bio": bio,
            ":updatedAt": timestamp,
        },
        UpdateExpression: "SET #pn = :profileName, title = :title, bio = :bio, updatedAt = :updatedAt",
    };

    dynamoDbClient.update(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        } else {
            const res = {
                statusCode: 200,
                body: JSON.stringify(data.Attributes)
            };
            callback(null, res);
        }
    })
}