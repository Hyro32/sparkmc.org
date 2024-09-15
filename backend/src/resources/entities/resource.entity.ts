import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  authorId: number;

  @Column()
  type: string;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  downloads: number;

  @Column()
  categories: string[];

  @Column()
  files: string[];

  @Column()
  versions: string[];

  @Column({ default: new Date() })
  created_at: Date;
}
