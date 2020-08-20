import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString} from "class-validator";

export class GetPriceListDto {

  @ApiProperty({})
  @IsNumberString()
  @IsNotEmpty()
  subAccountId: number

}
