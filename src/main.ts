import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { MqttOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice<MqttOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
      ca: process.env.MQTT_CA,
      cert: process.env.MQTT_CERT,
      key: process.env.MQTT_KEY,
    },
  });

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
