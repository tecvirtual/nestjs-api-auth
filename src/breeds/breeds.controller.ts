import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  //Param,
  //Delete,
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../common/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
//import { UpdateBreedDto } from './dto/update-breed.dto';

@ApiTags('breeds')
@Auth(Role.ADMIN)
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }*/
}
