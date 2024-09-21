import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BucketsModule } from 'src/buckets/buckets.module';
import { ResourcesModule } from 'src/resources/resources.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BucketsModule, ResourcesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
