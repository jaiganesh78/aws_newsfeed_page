import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppConfigModule } from './config/config.module';
import { FeedModule } from './feed/feed.module';
import { JobsModule } from './jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    FeedModule,
    JobsModule,
    AdminModule,
  ],
})
export class AppModule {}
