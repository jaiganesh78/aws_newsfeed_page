import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { FeedModule } from './feed/feed.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AppConfigModule, PrismaModule, FeedModule],
})
export class AppModule {}
