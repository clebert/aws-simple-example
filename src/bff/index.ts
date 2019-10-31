import {APIGatewayProxyResult} from 'aws-lambda';

export function handler(): Promise<APIGatewayProxyResult> {
  return Promise.resolve({
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify('Hello, World!')
  });
}
