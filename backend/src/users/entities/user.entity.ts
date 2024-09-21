import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Resource } from 'src/resources/entities/resource.entity';

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

  @OneToMany(() => Resource, (resource) => resource.url)
  likes?: Resource[];

  @Column()
  githubId?: string;

  @Column()
  discordId?: string;

  @Column({ default: false })
  isGithubAccount: boolean;

  @Column({ default: false })
  isDiscordAccount: boolean;

  @OneToMany(() => Resource, (resource) => resource.url)
  resources?: Resource[];
}
