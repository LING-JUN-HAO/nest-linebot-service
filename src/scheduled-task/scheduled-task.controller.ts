import { Controller, Post, UseGuards } from '@nestjs/common';
import { CronSecretGuard } from './cron-secret.guard';
import { ScheduledTaskService } from './scheduled-task.service';

@Controller('scheduled-task')
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  @Post()
  @UseGuards(CronSecretGuard)
  async handleScheduledTask() {
    return this.scheduledTaskService.runTask();
  }
}
