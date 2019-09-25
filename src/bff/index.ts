import {APIGatewayProxyResult} from 'aws-lambda';

export async function handler(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify('Hello, World!')
  };
}
