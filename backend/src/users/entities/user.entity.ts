import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  avatar?: string;
}
