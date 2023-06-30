import { BaseEntity } from "src/universal/entity/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserRole, UserStatus } from "./user.model";
import { Institution } from "src/institution/institution.entity";
import { IInstitution } from "src/institution/institution.model";

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    tourVisited: boolean;

    // @OneToOne(() => Role, role => role.user , { cascade: true })
    // @JoinColumn()
    // role: Role;

    @Column({ enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ enum: UserStatus, default: UserStatus.PENDING })
    status: UserStatus
  
    @OneToOne(() => Institution, institution => institution.user, { cascade: true })
    @JoinColumn()
    institution: IInstitution;

}