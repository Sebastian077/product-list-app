const doc = require('dynamodb-doc');
const aws = require('aws-sdk');
const dynamo = new doc.DynamoDB();

const docClient = new aws.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        },
    });
    const data = JSON.parse(event.body)
    if (event.path === "/removeItem") {
        dynamo.deleteItem(JSON.parse(event.body), done);
    } else if (event.path === "/getProducts") {
        dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
    } else if (event.path === "/addItem") {
        dynamo.putItem(JSON.parse(event.body), done);
    } else if (event.path === "/updateProduct") {
        const params = {
                TableName: "productList",
                Key: {
                    productId: data.id
                },
                UpdateExpression: "set price = :p, description = :d, isArchived = :a, #prodname = :n",
                ExpressionAttributeNames: {
                    "#prodname": "name"
                },
                ExpressionAttributeValues: {
                    ":p": data.price,
                    ":d": data.description,
                    ":a": data.isArchived,
                    ":n": data.name
                }
            };
            console.log(JSON.stringify(params));
            docClient.update(params, function(err, data) {
                if (err) console.log(err);
                else console.log(data);
            });
    } else {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
