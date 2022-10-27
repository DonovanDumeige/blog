import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../entities';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 800 })
  content: string;

  @Column()
  author?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  editedAt: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
