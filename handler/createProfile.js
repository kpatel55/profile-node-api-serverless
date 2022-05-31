const AWS = require("aws-sdk");
const PROFILES_TABLE = process.env.PROFILES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");


module.exports.createProfile = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const id = uuid.v4();
    const { name, title, bio } = JSON.parse(event.body);

    if (typeof name !== 'string'|| typeof title !== 'string' || typeof bio !== 'string') {
        console.error('Validation has failed')
        callback(new Error('Unable to create profile due to validation failure'));
        return;
    }

    const params = {
        TableName: PROFILES_TABLE,
        Item: {
            id: id,
            name: name,
            title: title,
            bio: bio,
            createdAt: timestamp,
            upadatedAt: timestamp,
        }
    }

    dynamoDbClient.put(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        } else {
            const res = {
                statusCode: 200,
                body: JSON.stringify({
                    message: `Successfully created profile ${id}`,
                }),
            };
            callback(null, res);        
        }
    })
}