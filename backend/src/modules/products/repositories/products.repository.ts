import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async findByProductCode(productCode: string) {
    return this.prisma.product.findUnique({
      where: { productCode },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.stockMovement.deleteMany({
        where: { productId: id },
      });
      
      return tx.product.delete({
        where: { id },
      });
    });
  }
}

