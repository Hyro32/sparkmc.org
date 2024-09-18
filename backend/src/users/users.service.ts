import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResourcesService } from 'src/resources/resources.service';
import { BucketsService } from 'src/buckets/buckets.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly resourcesService: ResourcesService,
    private readonly bucketsService: BucketsService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, githubId, discordId } = createUserDto;
    const isGithubAccount = Boolean(githubId);
    const isDiscordAccount = Boolean(discordId);
    const findEmail = this.findOneByEmail(email);
    const findUsername = this.findOneByUsername(username);

    if (findEmail || findUsername) {
      throw new BadRequestException('User already exists');
    }

    if (password) {
      createUserDto.password = bcrypt.hashSync(password, 10);
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      isGithubAccount,
      isDiscordAccount,
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        resources: true,
      },
    });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneByGithubId(githubId: string): Promise<User> {
    return this.usersRepository.findOneBy({ githubId });
  }

  findOneByDiscordId(discordId: string): Promise<User> {
    return this.usersRepository.findOneBy({ discordId });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
  ): Promise<unknown> {
    const { email, username } = updateUserDto;
    const findEmail = this.findOneByEmail(email);
    const findUsername = this.findOneByUsername(username);

    if (findEmail || findUsername) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.findOneById(id);

    if (avatar) {
      if (user.avatar) await this.bucketsService.delete(user.avatar);
      const avatarBucket = await this.bucketsService.upload(avatar);
      updateUserDto.avatar = avatarBucket;
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<unknown> {
    // TODO: remove resources and buckets
    return this.usersRepository.delete(id);
  }

  async generateUniqueUsername(username: string): Promise<string> {
    let newUsername = username;
    let count = 1;
    let isUnique = false;

    while (!isUnique) {
      const user = await this.findOneByUsername(newUsername);

      if (!user) {
        isUnique = true;
      } else {
        newUsername = `${username}${count}`;
        count++;
      }
    }

    return newUsername;
  }
}
