import json
import boto3

def handler(event, context):
    student = json.loads(event['body'])

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('awsCourse')
    result = table.put_item(Item=student)

    codeResponse = result['ResponseMetadata']['HTTPStatusCode']
    if (codeResponse == 200):
        bodyResponse = student['id']
    else:
        bodyResponse = 'Error saving data'

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