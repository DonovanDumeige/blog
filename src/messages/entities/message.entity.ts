/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class message {
  @PrimaryGeneratedColumn() // clé primaire
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column("varchar", {length: 255})
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
