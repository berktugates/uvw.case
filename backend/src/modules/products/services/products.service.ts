import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ERROR_MESSAGES } from '../../../../constants';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productsRepository.findByProductCode(createProductDto.productCode);
    
    if (existingProduct) {
      throw new ConflictException(ERROR_MESSAGES.PRODUCT.CODE_EXISTS);
    }

    return this.productsRepository.create(createProductDto);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);
    
    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne(id);
    
    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    if (updateProductDto.productCode) {
      const existingProduct = await this.productsRepository.findByProductCode(updateProductDto.productCode);
      
      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictException(ERROR_MESSAGES.PRODUCT.CODE_EXISTS);
      }
    }

    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOne(id);
    
    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    try {
      await this.productsRepository.remove(id);
      
      const deletedProduct = await this.productsRepository.findOne(id);
      if (deletedProduct) {
        throw new Error('Product deletion failed');
      }
      
      return { message: 'Product deleted successfully' };
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
      }
      throw error;
    }
  }
}

