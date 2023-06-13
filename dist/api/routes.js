"use strict";
exports.__esModule = true;
exports.routes = void 0;
var ProductController_1 = require("./controllers/ProductController");
var UserController_1 = require("./controllers/UserController");
var OrderController_1 = require("./controllers/OrderController");
var _routes = [
    ["/products", ProductController_1.ProductController],
    ["/users", UserController_1.UserController],
    ["/orders", OrderController_1.OrderController],
];
var routes = function (app) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use(url, controller);
    });
};
exports.routes = routes;
