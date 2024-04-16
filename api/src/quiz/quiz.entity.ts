import { Question } from 'src/question/question.entity';
import { BaseEntity } from 'src/universal/entity/base.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Quiz extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Question)
  @JoinColumn()
  questions: Question[];
}
