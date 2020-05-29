import { Injectable } from '@nestjs/common';
import { Message } from '@scl-co-eval/common';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'empty workspace' };
  }
}
