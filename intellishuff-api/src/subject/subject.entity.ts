import { Institution } from "src/institution/institution.entity";
import { InstitutionType } from "src/institution/institution.model";
import { BaseEntity } from "src/universal/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Subject extends BaseEntity {
    
    @Column()
    name: string;

    // @ManyToOne(() => Institution)
    // @JoinColumn()
    // institution: Institution; 
}