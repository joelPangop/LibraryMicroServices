import {CustomerController} from "../controllers/customerController";


export class CustomerRoute {

    public customerController: CustomerController = new CustomerController();

    public routes(app): void {
        app
            .route("/customer")
            .get(this.customerController.findAll)
            .post(this.customerController.newCustomer);
        app
            .route("/customer/:customerId")
            .get(this.customerController.findById);
    }
}