import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Storage, ID } from 'node-appwrite';

@Injectable()
export class BucketsService implements OnModuleInit {
  private readonly client = new Client();
  private readonly buckets = new Storage(this.client);

  constructor(private readonly config: ConfigService) {}

  async upload(file: any): Promise<string> {
    const resourceBucket = await this.buckets.createFile(
      this.config.get('BUCKET_ID'),
      ID.unique(),
      file,
    );

    return resourceBucket.$id;
  }

  async delete(id: string): Promise<void> {
    await this.buckets.deleteFile(this.config.get('BUCKET_ID'), id);
  }

  async onModuleInit(): Promise<void> {
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(this.config.get('APPWRITE_PROJECT_ID'));
  }
}
