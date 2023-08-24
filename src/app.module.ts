import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';

import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_URL,
          ca: process.env.MQTT_CA,
          cert: process.env.MQTT_CERT,
          key: process.env.MQTT_KEY,
          protocolId: 'MQTT',
          protocolVersion: 5,
        },
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'red-cjjqk0ocfp5c738s2oqg',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
