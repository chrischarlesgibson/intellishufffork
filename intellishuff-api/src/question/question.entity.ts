import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../universal/entity/base.entity";
import { Subject } from "src/subject/subject.entity";
import { Institution } from "src/institution/institution.entity";
import { CollegeYear, InstitutionType, SchoolCLass } from "src/institution/institution.model";

@Entity()
export class Question extends BaseEntity {
    
    @Column()
    text: string;

    @Column("text")
    options: string;

    @Column({nullable: true})
    collegeYear: CollegeYear;
    
    @Column({nullable: true})
    schoolCLass: SchoolCLass

    @Column()
    institutionType: InstitutionType;

    @ManyToOne(() => Institution, {eager: true})
    @JoinColumn()
    institution: Institution;

    // @Column()
    // classId: string;
    
    // @Column()
    // subjectId: string;

    @ManyToOne(() => User)
    @JoinColumn()
    createdBy: User;
    
    @ManyToOne(() => User)
    @JoinColumn()
    updatedBy: User;
    

    @ManyToOne(() => Subject)
    @JoinColumn()
    subject: Subject;

}