const getAsVariable = (varName, defaultValue = undefined) => {
    let value = process.env[varName];
    if (!value) {
        value = defaultValue;
    }
    if (value === undefined) {
        throw new Error(`The variable ${varName} must be set.`);
    }
    return value;
};

const getVariableAsArray = (varName, defaultValue = undefined) => {
    const value = getAsVariable(varName, defaultValue);
    return value.split(',');
};

const getVariableAsFloat = (varName, defaultValue = undefined) => {
    const value = getAsVariable(varName, defaultValue);
    return parseFloat(value);
};

const getVariableAsInt = (varName, defaultValue = undefined) => {
    const value = getVariableAsFloat(varName, defaultValue);
    return parseInt(value);
};

const getVariableAsString = (varName, defaultValue = undefined) => getAsVariable(varName, defaultValue);


const variables = {};

variables.AUTH_TOKENS = getVariableAsArray('AUTH_TOKENS', '');
variables.DB = getVariableAsString('DB', '');
variables.DB_USR = getVariableAsString('DB_USR', '');
variables.DB_PWD = getVariableAsString('DB_PWD', '');
variables.DB_HOST = getVariableAsString('DB_HOST', '');
variables.APP_PORT = getVariableAsInt('APP_PORT', '3333');
variables.SESSION_SECRET = getVariableAsString('SESSION_SECRET', 'xxx');
variables.APP_ADDR = getVariableAsString('APP_ADDR', '*');

export default variables;
