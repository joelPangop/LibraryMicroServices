"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customerController_1 = require("../controllers/customerController");
var CustomerRoute = /** @class */ (function () {
    function CustomerRoute() {
        this.customerController = new customerController_1.CustomerController();
    }
    CustomerRoute.prototype.routes = function (app) {
        app
            .route("/customer")
            .get(this.customerController.findAll)
            .post(this.customerController.newCustomer);
        app
            .route("/customer/:customerId")
            .get(this.customerController.findById);
    };
    return CustomerRoute;
}());
exports.CustomerRoute = CustomerRoute;
//# sourceMappingURL=customerRoute.js.map