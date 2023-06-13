"use strict";
exports.__esModule = true;
exports.requestNotFound404 = void 0;
var ErrorExceptionCustom_1 = require("./error-handler/ErrorExceptionCustom");
var requestNotFound404 = function (req, res, next) {
    // eslint-disable-next-line no-undef
    var error = new ErrorExceptionCustom_1.ErrorExceptionCustom("Not Found");
    error.code = 404;
    next(error);
};
exports.requestNotFound404 = requestNotFound404;
