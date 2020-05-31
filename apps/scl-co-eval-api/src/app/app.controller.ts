import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from '@scl-co-eval/domain'; 

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('hello')
    @UseGuards(JwtAuthGuard)
    getData(): {
        message: string;
    } {
        return this.appService.getData();
    }
}
