import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column({ type: 'text' })
  password: string;
}
