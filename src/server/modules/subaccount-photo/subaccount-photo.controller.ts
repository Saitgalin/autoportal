import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import {GetSubAccountPhotos} from "../../../common/dto/subaccount/get-subaccount-photos";
import {AuthenticationGuard} from "../jwt-token/authorization.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {SubAccountFileUploadDto} from "../../../common/dto/subaccount/subaccount-file-upload.dto";
import {AuthAccount} from "../account/decorators/account.decorator";
import {Account} from "../account/repository/account.entity";
import {SubAccountPhoto} from "./repository/subaccount-photo.entity";
import {SubAccountPhotoService} from "./subaccount-photo.service";
import {PhotoByPathDto} from "../../../common/dto/subaccount/photo-by-path.dto";

@ApiTags('subAccountPhoto')
@ApiBearerAuth()
@Controller('subaccount-photo')
export class SubaccountPhotoController {

  constructor(
      private readonly subAccountPhotoService: SubAccountPhotoService
  ) {
  }

  @Get('/getSubAccountPhotos')
  async getSubAccountPhotos(
      @Query(new ValidationPipe()) getSubAccountPhotos: GetSubAccountPhotos, @Res() res
  ) {
    await this.subAccountPhotoService.subAccountFirstPhoto(getSubAccountPhotos.subAccountId, res)
  }

  @Get('/getSubAccountPhotoPaths')
  async getSubAccountPhotoPaths(
      @Query(new ValidationPipe()) getSubAccountPhotos: GetSubAccountPhotos
  ): Promise<string[]> {
    return await this.subAccountPhotoService.imagePathsBySubAccount(getSubAccountPhotos.subAccountId)
  }

  @Get('/subAccountPhotoByPath')
  async photoByPath(
      @Query(new ValidationPipe()) photoByPathDto: PhotoByPathDto, @Res() res
  ) {
    await this.subAccountPhotoService.subAccountPhotoByPath(photoByPathDto.path, res)
  }

  @UseGuards(AuthenticationGuard)
  @Post('/loadPhoto')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Загрузить фотографию магазина',
    type: SubAccountFileUploadDto,
  })
  async loadPhoto(
      @AuthAccount() account: Account,
      @UploadedFile() file,
      @Body() request
  ): Promise<SubAccountPhoto> {
    return this.subAccountPhotoService.uploadPhoto(
        account, file, parseInt(request.subAccountId)
    )
  }


}
