import {Controller, Get, Render} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('layout')
@Controller('/')
export class AppController {
	@Get([''])
	@Render('layout')
	pages() {

	}
}
