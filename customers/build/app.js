"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var customerRoute_1 = require("./api/customerRoute");
var App = /** @class */ (function () {
    function App(port) {
        this.app = express();
        this.customerRoute = new customerRoute_1.CustomerRoute();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.port = port;
        this.customerRoute.routes(this.app);
    }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    return App;
}());
exports.App = App;
exports.default = App;
//# sourceMappingURL=app.js.map