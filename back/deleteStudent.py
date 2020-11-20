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
           'Access-Control-Allow-Origin': 'http://franvalverde-website.s3-website.eu-central-1.amazonaws.com',
           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps(bodyResponse)
    }
    return response