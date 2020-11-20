import json
import boto3

def handler(event, context):
    idStudent = event['pathParameters']['id']

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('awsCourse')
    key = {
        'id': idStudent
    }
    result = table.get_item(Key=key)


    codeResponse = result['ResponseMetadata']['HTTPStatusCode']
    if (codeResponse == 200):
        item = result.get('Item', {})
        bodyResponse = {
            'item': item
        }
    else:
        bodyResponse = 'Error get data'

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