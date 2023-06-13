"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ErrorExceptionCustom_1 = require("./error-handler/ErrorExceptionCustom");
var authToken = function (req, res, next) {
    var authHead = req.headers.authorization ||
        req.body.token ||
        req.query.token ||
        req.params.token ||
        req.headers["x-access-token"];
    var token = authHead ? authHead.split(" ")[1] : "";
    if (!token) {
        throw new ErrorExceptionCustom_1.ErrorExceptionCustom(ErrorExceptionCustom_1.ErrorExceptionCustom.Unauthenticated, {
            message: "A token is required for authentication"
        });
    }
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_KEY);
        res.locals.userData = decoded;
    }
    catch (err) {
        // return res.status(401).send("Invalid Token");
        next(err);
    }
    return next();
};
exports.authToken = authToken;
