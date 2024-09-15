import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [BucketsService],
  exports: [BucketsService],
})
export class BucketsModule {}
