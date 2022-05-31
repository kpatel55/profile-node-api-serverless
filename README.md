# Serverless Framework Node on AWS

Develop and deploy a simple Node API service, backed by DynamoDB database, running on AWS Lambda using the traditional Serverless Framework.

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
sls deploy
```

After running deploy, you should see output similar to:

```bash
Deploying node-serverless-api to stage dev (us-east-1)

✔ Service deployed to stack node-serverless-api-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
```

### Invocation

After successful deployment, you can create a new profile by calling the corresponding endpoint:

```bash
curl --request POST 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/profiles/create' --header 'Content-Type: application/json' --data-raw '{"name": "John Doe", "title": "Owner", "bio": "Owner and creater of sample organization"}'
```

You can later retrieve the profile by `id` by calling the following endpoint:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/profiles/get/id
```
