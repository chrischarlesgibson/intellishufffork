import {  Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../universal/entity/base.entity";
import { InstitutionType } from "./institution.model";
import { User } from "src/user/user.entity";

@Entity()
export class Institution extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'blob', nullable: true })
    image: Buffer

    @Column({enum: InstitutionType})
    type: InstitutionType;

    // @OneToOne(() => User, user => user.institution)
    // user: User;
}