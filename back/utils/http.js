import httpCodes from './httpCodesEnum';


const response = (res, code, message = undefined, data = undefined) => {
    res.status(code);
    const resp = {};

    if (code) {
        resp.code = code;
    }
    if (message) {
        resp.message = message;
    }
    if (data) {
        resp.data = data;
    }

    res.json(resp);
};

const fieldIsMissingResponse = (res, fieldName) => {
    let message = `Field ${fieldName} is required.`;
    if (!fieldName) {
        message = 'Some fields are required, look at the docs for more details.';
    }
    response(res, httpCodes.BAD_REQUEST, message);
};

const mountResponse = (data = [], messageForClient = '', hasIncorrectInfoFromClient = false, hasError = false) => {
    const ret = {};
    if (hasError) {
        ret.internalError = true;
    }
    if (hasIncorrectInfoFromClient) {
        ret.error = true;
    }
    if (data) {
        ret.data = data;
    }
    if (messageForClient) {
        ret.message = messageForClient;
    }
    return ret;
};

const responseError = (res, errorInfo) => {
    if (errorInfo.isClientError) {
        console.warn('Handled error:', errorInfo.logMessage);
        return response(res, httpCodes.BAD_REQUEST, errorInfo.message);
    }
    console.error('Error:', errorInfo.originalError);
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'It was not possible to perform the request');
};


export default {
    response,
    fieldIsMissingResponse,
    mountResponse,
    responseError,
};
