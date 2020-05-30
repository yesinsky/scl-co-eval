import { Injectable } from '@nestjs/common';
import { ConfigService } from 'libs/common/src/lib/infrastructure/config/config.service';

@Injectable()
export class AppService {
    getData(): {
        message: string;
    } {
        return { message: 'empty workspace' };
    }
}
