import { Module } from '@nestjs/common';
import { LineConfigProvider } from 'src/line-webhook/line-webhook.provider';
import { LineMessageModule } from 'src/line-message/line-message.module';
import { ScheduledTaskController } from './scheduled-task.controller';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  imports: [LineMessageModule],
  controllers: [ScheduledTaskController],
  providers: [ScheduledTaskService, LineConfigProvider],
})
export class ScheduledTaskModule {}
