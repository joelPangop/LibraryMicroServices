import {BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "./Address";

@Entity("customer")
export class Customer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Index()
    @OneToOne(() => Address, { nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE', cascade:["insert", "update", "remove"] })
    @JoinColumn({name:'addressId'})
    address: Address;
}