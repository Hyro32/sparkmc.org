import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { BucketsService } from 'src/buckets/buckets.service';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    private readonly bucketsService: BucketsService,
  ) {}

  create(createResourceDto: CreateResourceDto) {
    if (this.findOne(createResourceDto.url)) {
      throw new BadRequestException('Resource already exists');
    }

    const resource = this.resourcesRepository.create(createResourceDto);
    return this.resourcesRepository.save(resource);
  }

  findAll() {
    return this.resourcesRepository.find();
  }

  findOne(url: string) {
    return this.resourcesRepository.findOneBy({ url });
  }

  async update(
    url: string,
    updateResourceDto: UpdateResourceDto,
    icon: Express.Multer.File,
  ) {
    if (this.findOne(updateResourceDto.url)) {
      throw new BadRequestException('Resource already exists');
    }

    const resource = await this.findOne(url);

    if (icon) {
      if (resource.icon) await this.bucketsService.delete(resource.icon);
      const iconBucket = await this.bucketsService.upload(icon);
      updateResourceDto.icon = iconBucket;
    }

    return this.resourcesRepository.update(url, updateResourceDto);
  }

  remove(url: string) {
    return this.resourcesRepository.delete(url);
  }
}
