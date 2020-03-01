module.exports.responseMessages = {
    ACTION_COMPLETE: 'Successful',
    PARAMETER_MISSING: 'Insufficient information was supplied. Please check and try again.',
    DUPLICATE_EMAIL: 'Email already in use',
    INVALID_EMAIL_PASSWORD: 'Email or Password is invalid',
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    SUCCESS: 'Successful',
    FORBIDDEN: 'Forbidden',
    INVALID_PATIENT: 'Patient doesnt exist in system',
    INVALID_DOCTOR: 'Doctor doesnt exist in system',
    INVALID_DOCUMENT: 'Document not found in system',
    INVALID_DOCUMENT: 'Appointment not found in system',
}

module.exports.responseFlags = {
    ACTION_COMPLETE: 200,
    PARAMETER_MISSING: 100,
    FORBIDDEN: 403,
    SHOW_ERROR_MESSAGE: 499
}

module.exports.swaggerDefaultResponseMessages = [
    { code: 200, message: 'OK' },
    { code: 400, message: 'Bad Request' },
    { code: 401, message: 'Unauthorized' },
    { code: 404, message: 'Data Not Found' },
    { code: 500, message: 'Something went wrong, try again' },
];

module.exports.USER_ROLES = {
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR',
    ASSISTANT: 'ASSISTANT',
    CLINIC: 'CLINIC'
}

module.exports.SESSION_TIME_LIMIT = {
    FREQ: 'd',
    VALUE: '7'
}

module.exports.AUTH_TOKEN_SECRET_KEY = 'helloworlddlrowolleh';