import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { SmartLightPayload } from './types/smart-light-payload.type';
import { SmartLightPayloadResponse } from './types/smart-light-response.type';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async setPayload(data: SmartLightPayload): Promise<void> {
    const timestamp = new Date().getTime();
    await this.cacheService.set(
      timestamp.toString(),
      JSON.stringify({ ...data, timestamp: timestamp }),
      60 * 60 * 24 * 1, // 1 Day
    );
  }

  async getData(limit: number): Promise<SmartLightPayloadResponse[]> {
    const keys = await this.cacheService.store.keys('*');

    const data: SmartLightPayloadResponse[] = [];

    for (const key of keys) {
      const value = await this.cacheService.get<string>(key);

      data.push(JSON.parse(value));
    }

    return data.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
  }
}
