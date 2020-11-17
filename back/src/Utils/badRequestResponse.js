const badRequestResponse = () => {
    return {
        code: 400,
        body: { message: 'Bad Request' }
    };
};

exports.badRequestResponse = badRequestResponse;
