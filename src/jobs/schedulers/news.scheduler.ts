import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  JobTriggerPayload,
  NEWS_CLEANUP_QUEUE,
  NEWS_CLEANUP_SCHEDULE_PATTERN,
  NEWS_CLEANUP_SCHEDULER_ID,
  NEWS_INGESTION_QUEUE,
  NEWS_INGESTION_SCHEDULE_PATTERN,
  NEWS_INGESTION_SCHEDULER_ID,
  RUN_NEWS_CLEANUP,
  RUN_NEWS_INGESTION,
} from '../queues/queue.constants';

@Injectable()
export class NewsScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(NewsScheduler.name);

  constructor(
    @InjectQueue(NEWS_INGESTION_QUEUE)
    private readonly newsIngestionQueue: Queue<JobTriggerPayload>,
    @InjectQueue(NEWS_CLEANUP_QUEUE)
    private readonly newsCleanupQueue: Queue<JobTriggerPayload>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      await Promise.all([
        this.newsIngestionQueue.upsertJobScheduler(
          NEWS_INGESTION_SCHEDULER_ID,
          {
            pattern: NEWS_INGESTION_SCHEDULE_PATTERN,
          },
          {
            name: RUN_NEWS_INGESTION,
            data: { triggeredBy: 'scheduler' },
          },
        ),
        this.newsCleanupQueue.upsertJobScheduler(
          NEWS_CLEANUP_SCHEDULER_ID,
          {
            pattern: NEWS_CLEANUP_SCHEDULE_PATTERN,
          },
          {
            name: RUN_NEWS_CLEANUP,
            data: { triggeredBy: 'scheduler' },
          },
        ),
      ]);

      this.logger.log(
        `Registered recurring jobs: ${NEWS_INGESTION_SCHEDULER_ID}, ${NEWS_CLEANUP_SCHEDULER_ID}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to register recurring jobs: ${this.formatError(error)}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }
}
