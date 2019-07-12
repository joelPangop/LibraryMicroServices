import { PrimaryGeneratedColumn, Column, OneToMany, ChildEntity, Entity, BaseEntity, TreeParent, JoinColumn, TableInheritance } from "typeorm";

@Entity("address")
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    streetNumber: number;
    @Column()
    streetName: string;
    @Column()
    appartementNumber: number;
    @Column()
    town: string;
    @Column()
    country: string;
    @Column()
    region: string;
    @Column()
    postalCode: string;
}
