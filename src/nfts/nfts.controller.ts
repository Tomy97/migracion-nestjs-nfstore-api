import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  Request,
  StreamableFile,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('nfts')
@Controller('nfts')
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}

  // @Post('upload')
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  create(
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [new FileTypeValidator({ fileType: 'image' })],
    //   }),
    // )
    // file: Express.Multer.File,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body() newNft: CreateNftDto,
  ) {
    const user = req.user;
    console.log('user', user);
    newNft.owner = user;
    newNft.create = user;
    newNft.file = file;

    return this.nftsService.create(newNft);
  }

  @Post('buy')
  @UseGuards(AuthGuard('jwt'))
  buy(@Req() req, @Body() nft: any) {
    console.log('nft', nft);

    return this.nftsService.buy(nft, req.user.id);
  }

  @Get('images')
  @UseGuards(AuthGuard('jwt'))
  getImages(@Res() res: Response) {
    try {
      const imagePath = join(__dirname, '..', 'uploads');
      const imageStream = createReadStream(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      return new StreamableFile(imageStream);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Image not found',
      });
    }
  }
  @Get()
  findAll() {
    return this.nftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNftDto: UpdateNftDto) {
    return this.nftsService.update(+id, updateNftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nftsService.remove(+id);
  }
}
