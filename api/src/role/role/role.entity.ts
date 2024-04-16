import { BaseEntity } from 'src/universal/entity/base.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @Column()
  role: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
