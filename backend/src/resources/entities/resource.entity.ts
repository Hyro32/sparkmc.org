import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryColumn({ unique: true })
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  icon: string;

  @Column({ default: 0 })
  downloads: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
