import { DeleteItemCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
export const handler = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ songId: event.pathParameters.songId }),
        };
        const deleteResult = await client.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted song.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete song.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};