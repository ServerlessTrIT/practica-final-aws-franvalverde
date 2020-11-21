import json
import boto3

def handler(event, context):
    idStudent = event['pathParameters']['id']

    key = {
        'id': idStudent
    }
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('awsCourse')
    result = table.delete_item(Key=key)

    codeResponse = result['ResponseMetadata']['HTTPStatusCode']
    if (codeResponse == 200):
        bodyResponse = 'delete ok'
    else:
        bodyResponse = 'Error deleting data'

    response = {
        "statusCode": codeResponse,
        "headers": {
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
        },
        "body": json.dumps(bodyResponse)
    }
    return response