import { BaseEntity } from 'src/universal/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { UserStatus } from './user.model';
import { Institution } from 'src/institution/institution.entity';
import { Role } from 'src/role/role/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  tourVisited: boolean;

  @Column({ enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @OneToOne(() => Institution, { cascade: true })
  @JoinColumn()
  institution: Institution;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
