'use strict';

const { responseOutput } = require('src/Utils/responseOutput');
const { badRequestResponse } = require('src/Utils/badRequestResponse');

module.exports.handler = async event => {
    let response = badRequestResponse();
    const studentRequest = JSON.parse(event.body);
    console.log(studentRequest);
    return responseOutput(response.code, response.body);
};
