import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmartLightPayload } from './types/smart-light-payload.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('esp8266/pub')
  async setPayload(@Payload() data: SmartLightPayload) {
    await this.appService.setPayload(data);
  }

  @Get('/data')
  async getData() {
    return await this.appService.getData();
  }

  @Get('/healthz')
  healthz() {
    return 'OK';
  }
}
