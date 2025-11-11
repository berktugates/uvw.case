import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma.service';
import { StockMovementType } from '@prisma/client';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}

  async createMovement(data: {
    productId: string;
    type: StockMovementType;
    quantity: number;
    prevStock: number;
    newStock: number;
    createdBy: string;
  }) {
    return this.prisma.stockMovement.create({
      data,
      include: {
        product: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findMovements(filters?: {
    productId?: string;
    type?: StockMovementType;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (filters?.productId) {
      where.productId = filters.productId;
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    return this.prisma.stockMovement.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            productCode: true,
            name: true,
            brand: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

