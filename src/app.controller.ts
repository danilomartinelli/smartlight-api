import { Controller, Get, Query } from '@nestjs/common';
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
  async getData(@Query('limit') limit: string) {
    return await this.appService.getData(parseInt(limit || '10'));
  }

  @Get('/healthz')
  healthz() {
    return 'OK';
  }
}
