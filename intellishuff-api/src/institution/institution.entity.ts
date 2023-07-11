import {  Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../universal/entity/base.entity";
import { InstitutionType } from "./institution.model";

@Entity()
export class Institution extends BaseEntity {

    @Column()
    name: string;

    @Column()
    type: InstitutionType;
}