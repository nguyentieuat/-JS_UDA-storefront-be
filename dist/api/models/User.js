"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.User = void 0;
var db_1 = require("../db");
var Utils_1 = require("../utils/Utils");
var User = /** @class */ (function () {
    function User() {
        // define table
        this.table = "users";
    }
    // create a user
    User.prototype.createUser = function (user, isAuth) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, password, hashPassword, conn, sql, result, id, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        firstname = user.firstname, lastname = user.lastname, password = user.password;
                        return [4 /*yield*/, Utils_1.Utils.generatePassword(password)];
                    case 1:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, db_1.pool.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = "INSERT INTO ".concat(this.table, " (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *");
                        return [4 /*yield*/, conn.query(sql, [
                                firstname,
                                lastname,
                                hashPassword,
                            ])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        id = result.rows[0].id;
                        return [4 /*yield*/, Utils_1.Utils.generateToken(id)];
                    case 4:
                        token = (_a.sent());
                        return [2 /*return*/, {
                                auth: isAuth,
                                name: firstname + " " + lastname,
                                token: token
                            }];
                    case 5:
                        err_1 = _a.sent();
                        throw new Error("Could not create user. Error: ".concat(err_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // select all users
    User.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1.pool.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM ".concat(this.table);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not get all users. Error: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // select user by id
    User.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1.pool.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM ".concat(this.table, " WHERE id = $1");
                        return [4 /*yield*/, conn.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not get user by id. Error: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // update user
    User.prototype.updateUser = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordNew, _a, sql, conn, rows, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!userData.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utils_1.Utils.generatePassword(userData.password)];
                    case 1:
                        _a = (_b.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        _a = "";
                        _b.label = 3;
                    case 3:
                        passwordNew = _a;
                        sql = passwordNew
                            ? "UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4 RETURNING *"
                            : "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *";
                        return [4 /*yield*/, db_1.pool.connect()];
                    case 4:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sql, passwordNew
                                ? [userData.firstname, userData.lastname, passwordNew, id]
                                : [userData.firstname, userData.lastname, id])];
                    case 5:
                        rows = (_b.sent()).rows;
                        conn.release();
                        return [2 /*return*/, rows[0]];
                    case 6:
                        err_4 = _b.sent();
                        throw new Error("Could not update user ".concat(id, ". Error: ").concat(err_4));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // delete user
    User.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM ".concat(this.table, " WHERE id=$1 RETURNING *");
                        return [4 /*yield*/, db_1.pool.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
