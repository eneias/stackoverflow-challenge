const handle = (error) => {
    const errorInfo = {
        isClientError: false,
        originalError: error,
    };

    if (error.original && error.original.code === '22P02') { // invalid input syntax for type uuid
        errorInfo.isClientError = true;
        errorInfo.message = 'Invalid params received';
        errorInfo.logMessage = 'Client sent an parameter with invalid UUID format';
    }

    if (error.constructor.name === 'ValidationError') {
        errorInfo.isClientError = true;
        errorInfo.message = error.message;
        errorInfo.errors = error.errors;
        errorInfo.logMessage = 'Client sent an invalid configuration.';
    }

    return errorInfo;
};


export default {
    handle,
};
