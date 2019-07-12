import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Customer} from "../models/Customer";
import {Address} from "../models/Address";

export class CustomerController {

    public findAll = async (req: Request, res: Response) => {
        const customerRepository = getRepository((Customer));
        try {
            const customers = customerRepository
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.address", "address")
                .getMany();

            Promise.resolve(customers).then(value => {
                console.log("custumers = ", value);
                res.status(200).send(value);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("an error occured in the system");
        }
    };

    public newCustomer = async (req: Request, res: Response) => {
        try {
            let {
                name, age
            } = req.body;

            let customer = new Customer();
            customer.name = name;
            customer.age = age;

            let adrObj = req.body.address as Address;
            console.log(req.body);
            let addressCustomer = new Address();
            if (adrObj) {
                addressCustomer = adrObj;
            }
            customer.address = addressCustomer;
            const customerRepository = getRepository(Customer);

            customerRepository.save(customer);
            Promise.resolve(customer).then(value => {
                console.log("customer =", value);
                res.status(200).json("customer created");
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("an error occured in the system");
        }
    };

    public findById = async (req: Request, res: Response) => {
        const id = req.params.customerId;
        const customerRepository = getRepository(Customer);
        try{
            const customer = await customerRepository
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.address", "address")
                .where("customer.id = :id", {id: id})
                .getOne();
            Promise.resolve(customer).then(value => {
                console.log("customer = ", value);
                res.status(200).json(value);
            });
        }catch (err) {
            console.log(err);
            res.status(500).json("an error occured int the system");

        }
    }
}