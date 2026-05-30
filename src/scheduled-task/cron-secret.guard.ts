import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronSecretGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-cron-secret'];
    const expected = this.configService.get<string>('CRON_SECRET');

    if (!token || token !== expected) {
      throw new UnauthorizedException('Invalid cron secret');
    }

    return true;
  }
}
