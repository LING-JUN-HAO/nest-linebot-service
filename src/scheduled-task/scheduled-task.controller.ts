import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CronSecretGuard } from './cron-secret.guard';
import { ScheduledTaskService } from './scheduled-task.service';

@Controller('scheduled-task')
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  @Post()
  @UseGuards(CronSecretGuard)
  async handleScheduledTask(@Body() body: any) {
    console.log('收到排程任務：', body);
    // 處理 line push API
    return this.scheduledTaskService.runTask(body);
  }
}
