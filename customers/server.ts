import App from "./app";
import "reflect-metadata";
import { createConnection } from "typeorm";

export const startServer = async () => {
    createConnection()
        .then(async connection => { })
        .catch(error => console.log(error));

    const app = new App(5555);

    app.listen();
}

startServer();