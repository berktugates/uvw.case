import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class PrismaMigrateService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') {
      try {
        await execAsync('npx prisma migrate deploy');
        console.log('Database migrations applied successfully');
      } catch (error) {
        console.error('Migration error:', error);
      }
    }
  }
}

