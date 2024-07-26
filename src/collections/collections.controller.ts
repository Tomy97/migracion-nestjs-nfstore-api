import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return await this.collectionsService.create(createCollectionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  // async findAll(@Req() req) {
  async findAll(@Req() req, @Query() filters?: any) {
    // console.log('filters', req.user);
    return await this.collectionsService.findAll(filters, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.collectionsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return await this.collectionsService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.collectionsService.remove(+id);
  }
}
