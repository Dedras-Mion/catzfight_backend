/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    Error.captureStackTrace(this, this.constructor);
  }
}

class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = true) {
    super(message, status, isPublic);
  }
}

module.exports = APIError;
