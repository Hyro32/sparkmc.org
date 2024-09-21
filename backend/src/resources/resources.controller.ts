import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':url')
  findOne(@Param('url') url: string) {
    return this.resourcesService.findOne(url);
  }

  @Patch(':url')
  @UseInterceptors(FileInterceptor('icon'))
  update(
    @Param('url') url: string,
    @Body() updateResourceDto: UpdateResourceDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    icon: Express.Multer.File,
  ) {
    return this.resourcesService.update(url, updateResourceDto, icon);
  }

  @Delete(':url')
  remove(@Param('url') url: string) {
    return this.resourcesService.remove(url);
  }
}
