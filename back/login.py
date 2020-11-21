import json
import boto3
import os

def handler(event, context):
    codeResponse = 200
    if event['body'] is None:
        codeResponse = 400
    else:
        user = json.loads(event['body'])
        email = user.get('username', '')
        password = user.get('password', '')

        client = boto3.client('cognito-idp')

        ap = {
            'USERNAME': email,
            'PASSWORD': password
        }

        try:
            result = client.initiate_auth(AuthFlow='USER_PASSWORD_AUTH', AuthParameters=ap, ClientId=os.environ['CLIENT_ID'])
            body = {
                "token":result['AuthenticationResult']['IdToken']
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