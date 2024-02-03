import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonsService {
  hello(): string {
    return 'Hello Commons';
  }
}
