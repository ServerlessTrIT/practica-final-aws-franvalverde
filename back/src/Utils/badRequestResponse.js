const responseOutput = (code, body) => {
    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body, null, 2),
    };
};


exports.responseOutput = responseOutput;
