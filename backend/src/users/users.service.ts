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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<unknown> {
    const { email, username } = updateUserDto;
    const findEmail = this.findOneByEmail(email);
    const findUsername = this.findOneByUsername(username);

    if (findEmail || findUsername) {
      throw new BadRequestException('User already exists');
    }

    // TODO: update avatar

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<unknown> {
    // TODO: remove resources and buckets
    return this.usersRepository.delete(id);
  }
}
