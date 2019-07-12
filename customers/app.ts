import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {CustomerRoute} from "./api/customerRoute";

export class App {
    public app: express.Application = express();
    public port: number;
    public customerRoute: CustomerRoute = new CustomerRoute();

    constructor(port) {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static("public"));
        this.port = port;
        this.customerRoute.routes(this.app);
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;