import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'date' })
  createdOn?: Date;

  @Column({ nullable: true })
  updatedOn?: Date;
}
