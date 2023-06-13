"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ErrorExceptionCustom = void 0;
var ErrorExceptionCustom = /** @class */ (function (_super) {
    __extends(ErrorExceptionCustom, _super);
    function ErrorExceptionCustom(name, metaData) {
        if (name === void 0) { name = ErrorExceptionCustom.UnknownError; }
        if (metaData === void 0) { metaData = null; }
        var _newTarget = this.constructor;
        var _this = _super.call(this, name) || this;
        _this.code = 500;
        _this.metaData = null;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = name;
        _this.code = 500;
        _this.metaData = metaData;
        switch (name) {
            case ErrorExceptionCustom.Unauthenticated:
                _this.code = 401;
                break;
            case ErrorExceptionCustom.MaximumAllowedGrade:
                _this.code = 402;
                break;
            case ErrorExceptionCustom.AsyncError:
                _this.code = 400;
                break;
            case ErrorExceptionCustom.NotFound:
                _this.code = 404;
                break;
            default:
                _this.code = 500;
                break;
        }
        return _this;
    }
    ErrorExceptionCustom.Unauthenticated = "Unauthenticated";
    ErrorExceptionCustom.NotFound = "NotFound";
    ErrorExceptionCustom.MaximumAllowedGrade = "MaximumAllowedGrade";
    ErrorExceptionCustom.AsyncError = "AsyncError";
    ErrorExceptionCustom.UnknownError = "UnknownError";
    return ErrorExceptionCustom;
}(Error));
exports.ErrorExceptionCustom = ErrorExceptionCustom;
