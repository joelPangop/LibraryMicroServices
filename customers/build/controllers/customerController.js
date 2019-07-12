"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Customer_1 = require("../models/Customer");
var Address_1 = require("../models/Address");
var CustomerController = /** @class */ (function () {
    function CustomerController() {
        var _this = this;
        this.findAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var customerRepository, customers;
            return __generator(this, function (_a) {
                customerRepository = typeorm_1.getRepository((Customer_1.Customer));
                try {
                    customers = customerRepository
                        .createQueryBuilder("customer")
                        .leftJoinAndSelect("customer.address", "address")
                        .getMany();
                    Promise.resolve(customers).then(function (value) {
                        console.log("custumers = ", value);
                        res.status(200).send(value);
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(500).send("an error occured in the system");
                }
                return [2 /*return*/];
            });
        }); };
        this.newCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, age, customer, adrObj, addressCustomer, customerRepository;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, name = _a.name, age = _a.age;
                    customer = new Customer_1.Customer();
                    customer.name = name;
                    customer.age = age;
                    adrObj = req.body.address;
                    console.log(req.body);
                    addressCustomer = new Address_1.Address();
                    if (adrObj) {
                        addressCustomer = adrObj;
                    }
                    customer.address = addressCustomer;
                    customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                    customerRepository.save(customer);
                    Promise.resolve(customer).then(function (value) {
                        console.log("customer =", value);
                        res.status(200).json("customer created");
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json("an error occured in the system");
                }
                return [2 /*return*/];
            });
        }); };
        this.findById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, customerRepository, customer, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.customerId;
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customerRepository
                                .createQueryBuilder("customer")
                                .leftJoinAndSelect("customer.address", "address")
                                .where("customer.id = :id", { id: id })
                                .getOne()];
                    case 2:
                        customer = _a.sent();
                        Promise.resolve(customer).then(function (value) {
                            console.log("customer = ", value);
                            res.status(200).json(value);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.status(500).json("an error occured int the system");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return CustomerController;
}());
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map