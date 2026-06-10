import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisOptions } from 'ioredis';
import { ENV_KEYS } from '../../config/env.keys';
import {
  NEWS_CLEANUP_QUEUE,
  NEWS_INGESTION_QUEUE,
  QUEUE_DEFAULT_JOB_OPTIONS,
} from './queue.constants';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: createRedisConnection(configService),
      }),
    }),
    BullModule.registerQueue(
      {
        name: NEWS_INGESTION_QUEUE,
        defaultJobOptions: QUEUE_DEFAULT_JOB_OPTIONS,
      },
      {
        name: NEWS_CLEANUP_QUEUE,
        defaultJobOptions: QUEUE_DEFAULT_JOB_OPTIONS,
      },
    ),
  ],
  exports: [BullModule],
})
export class JobsQueueModule {}

function createRedisConnection(configService: ConfigService): RedisOptions {
  const host = configService.get<string>(ENV_KEYS.REDIS_HOST);
  const portValue = configService.get<string>(ENV_KEYS.REDIS_PORT);

  if (!host) {
    throw new Error('REDIS_HOST is not configured');
  }

  if (!portValue) {
    throw new Error('REDIS_PORT is not configured');
  }

  const port = Number(portValue);

  if (Number.isNaN(port)) {
    throw new Error('REDIS_PORT must be a valid number');
  }

  const password = configService.get<string>(ENV_KEYS.REDIS_PASSWORD);

  return {
    host,
    port,
    password: password || undefined,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  };
}
