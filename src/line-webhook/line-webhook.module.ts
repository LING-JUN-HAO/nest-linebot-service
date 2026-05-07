import { Module } from '@nestjs/common';
import { LineMessageModule } from 'src/line-message/line-message.module';
import { LineConfigProvider } from 'src/line-webhook/line-webhook.provider';
import { LineWebhookController } from './line-webhook.controller';
import { LineWebhookService } from './line-webhook.service';

@Module({
  imports: [LineMessageModule],
  controllers: [LineWebhookController],
  providers: [LineWebhookService, LineConfigProvider],
})
export class LineWebhookModule {}
