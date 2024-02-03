import { Injectable } from '@nestjs/common';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
class PrismaConfigService implements PrismaOptionsFactory {
  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query', 'error', 'warn'],
      },
      explicitConnect: true,
    };
  }
}
