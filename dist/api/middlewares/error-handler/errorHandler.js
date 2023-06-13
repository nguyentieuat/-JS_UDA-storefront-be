"use strict";
exports.__esModule = true;
exports.errorHandler = void 0;
var ErrorExceptionCustom_1 = require("./ErrorExceptionCustom");
var errorHandler = function (err, req, res) {
    console.log("Error handling middleware called.");
    console.log("Path:", req.path);
    console.error("Error occured:", err);
    if (err instanceof ErrorExceptionCustom_1.ErrorExceptionCustom) {
        res.status(err.code).send(err);
    }
    else {
        // For unhandled errors.
        res
            .status(500)
            .send({ code: "UnknownError", status: 500, message: err.message });
    }
};
exports.errorHandler = errorHandler;
