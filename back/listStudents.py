import json
import boto3

def handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('awsCourse')
    result = table.scan()


    codeResponse = result['ResponseMetadata']['HTTPStatusCode']
    if (codeResponse == 200):
        items = result.get('Items', [])
        bodyResponse = {
            'items': items
        }
    else:
        bodyResponse = 'Error list data'

    response = {
        "statusCode": codeResponse,
        "headers": {
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        "body": json.dumps(bodyResponse)
    }
    return response