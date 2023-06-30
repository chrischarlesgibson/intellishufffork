import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  createdOn?: Date

  @Column({ nullable: true })
  updatedOn?: Date
}