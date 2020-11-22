import json
import boto3
import os

def handler(event, context):
    codeResponse = 200
    if event['body'] is None:
        codeResponse = 400
    else:
        activator = json.loads(event['body'])
        code = activator.get('code', '')
        email = activator.get('username', '')

        client = boto3.client('cognito-idp')

        try:
            result = client.confirm_sign_up(ClientId=os.environ['CLIENT_ID'], Username=email, ConfirmationCode=code)
            body = {
                "message": "user activated successfully"
            }
        except Exception as e:
            codeResponse = 400
            body = {
                "message": e.args[0]
            }
    response = {
        "statusCode": codeResponse,
        "headers": {
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'OPTIONS,PUT'
        },
        "body": json.dumps(body)
    }
    return response