import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Resource {
  @PrimaryColumn()
  url: string;

  @OneToOne(() => User, (user) => user.username)
  author: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.username)
  likes?: User[];

  @Column()
  downloads: number;

  @Column()
  about: string;

  @Column()
  icon?: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  api_version: string;

  @Column()
  source?: string;

  @Column()
  support?: string;

  @Column({ default: new Date() })
  updated_at: Date;

  @Column({ default: new Date() })
  created_at: Date;
}
