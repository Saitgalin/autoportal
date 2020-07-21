import {Controller, Get, Render} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('layout')
@Controller('/')
export class AppController {
	@Get([''])
	pages() {
		return "ну, тут ничего нет"
	}
}
