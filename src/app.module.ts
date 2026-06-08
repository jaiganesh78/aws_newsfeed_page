import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { FeedModule } from './feed/feed.module';
import { JobsModule } from './jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AppConfigModule, PrismaModule, FeedModule, JobsModule],
})
export class AppModule {}
