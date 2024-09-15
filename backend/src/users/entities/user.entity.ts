import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from 'src/resources/entities/resource.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column()
  avatar?: string;

  @Column()
  avatar_public_id?: string;

  @Column()
  githubId?: string;

  @Column()
  discordId?: string;

  @Column({ default: false })
  isGithubAccount: boolean;

  @Column({ default: false })
  isDiscordAccount: boolean;

  @OneToMany(() => Resource, (resource) => resource.id)
  resources?: Resource[];
}
