import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma.service';
import { StockRepository } from '../repositories/stock.repository';
import { StockInDto } from '../dtos/stock-in.dto';
import { StockOutDto } from '../dtos/stock-out.dto';
import { StockMovementType } from '@prisma/client';
import { ERROR_MESSAGES } from '../../../../constants';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private stockRepository: StockRepository,
  ) {}

  async stockIn(stockInDto: StockInDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { productCode: stockInDto.productCode },
    });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.STOCK.PRODUCT_NOT_FOUND);
    }

    const prevStock = product.currentStock;
    const newStock = prevStock + stockInDto.quantity;

    await this.prisma.product.update({
      where: { id: product.id },
      data: { currentStock: newStock },
    });

    const movement = await this.stockRepository.createMovement({
      productId: product.id,
      type: StockMovementType.IN,
      quantity: stockInDto.quantity,
      prevStock,
      newStock,
      createdBy: userId,
    });

    return movement;
  }

  async stockOut(stockOutDto: StockOutDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: stockOutDto.productId },
    });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.STOCK.PRODUCT_NOT_FOUND);
    }

    if (product.currentStock < stockOutDto.quantity) {
      throw new BadRequestException(ERROR_MESSAGES.STOCK.INSUFFICIENT);
    }

    const prevStock = product.currentStock;
    const newStock = prevStock - stockOutDto.quantity;

    await this.prisma.product.update({
      where: { id: product.id },
      data: { currentStock: newStock },
    });

    const movement = await this.stockRepository.createMovement({
      productId: product.id,
      type: StockMovementType.OUT,
      quantity: stockOutDto.quantity,
      prevStock,
      newStock,
      createdBy: userId,
    });

    return movement;
  }

  async getMovements(filters?: {
    productId?: string;
    type?: StockMovementType;
    startDate?: Date;
    endDate?: Date;
  }) {
    return this.stockRepository.findMovements(filters);
  }
}

