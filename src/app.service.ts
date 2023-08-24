import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { SmartLightPayload } from './types/smart-light-payload.type';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async setPayload(data: SmartLightPayload): Promise<void> {
    await this.cacheService.set(
      data.time.toString(),
      JSON.stringify(data),
      60 * 60 * 24 * 7,
    );
  }

  async getData(): Promise<SmartLightPayload[]> {
    const keys = await this.cacheService.store.keys('*');

    const data: SmartLightPayload[] = [];

    for (const key of keys) {
      const value = await this.cacheService.get<string>(key);

      data.push(JSON.parse(value));
    }

    return data;
  }
}
