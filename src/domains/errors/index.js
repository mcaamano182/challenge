class ApiError extends Error {
    constructor(err, errorCode) {
        super(err);
        this.code = errorCode;
    }
}

class AuthError extends Error {
    constructor(err) {
        super(err);
        this.code = 401;
    }
}

class InternalError extends Error {
    constructor(err) {
        super(err);
        this.code = 500;
    }
}

class BadRequestError extends Error {
    constructor(err) {
        super(err);
        this.code = 400;
    }
}

class NotFoundError extends Error {
    constructor(err) {
        super(err);
        this.code = 404;
    }
}

module.exports = {
    AuthError,
    ApiError,
    InternalError,
    BadRequestError,
    NotFoundError
};
