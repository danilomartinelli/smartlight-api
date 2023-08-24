import { Injectable } from '@nestjs/common';
import { SmartLightPayload } from './types/smart-light-payload.type';

@Injectable()
export class AppService {
  getPayload(data: SmartLightPayload): void {
    console.log(data);
  }
}
