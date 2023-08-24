import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmartLightPayload } from './types/smart-light-payload.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('esp8266/pub')
  getPayload(@Payload() data: SmartLightPayload) {
    this.appService.getPayload(data);
  }

  @Get('/healthz')
  healthz() {
    return 'OK';
  }
}
