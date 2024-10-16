import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;
    const findEmail = this.findOneByEmail(email);
    const findUsername = this.findOne(username);

    if (findEmail || findUsername) {
      throw new BadRequestException('User already exists');
    }

    if (password) {
      createUserDto.password = bcrypt.hashSync(password, 10);
    }

    const user = this.usersRepository.create({
      ...createUserDto,
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(
    username: string,
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
  ): Promise<unknown> {
    const findEmail = this.findOneByEmail(updateUserDto.email);
    const findUsername = this.findOne(username);

    if (findEmail || findUsername) {
      throw new BadRequestException('User already exists');
    }

    // const user = await this.findOne(username);

    if (avatar) {
      // TODO: remove old avatar
      updateUserDto.avatar = avatar.filename;
    }

    return this.usersRepository.update(username, updateUserDto);
  }

  async remove(username: string): Promise<unknown> {
    // TODO: remove resources and buckets
    return this.usersRepository.delete(username);
  }

  async generateUniqueUsername(username: string): Promise<string> {
    let newUsername = username;
    let count = 1;
    let isUnique = false;

    while (!isUnique) {
      const user = await this.findOne(newUsername);

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
