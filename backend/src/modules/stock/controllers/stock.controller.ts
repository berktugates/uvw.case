import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StockService } from '../services/stock.service';
import { StockInDto } from '../dtos/stock-in.dto';
import { StockOutDto } from '../dtos/stock-out.dto';
import { RolesGuard } from '../../../middlewares/roles.guard';
import { Roles } from '../../../utils/roles.decorator';
import { Role, StockMovementType } from '@prisma/client';

@Controller('stock')
@UseGuards(AuthGuard('jwt'))
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('in')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.STOREKEEPER)
  stockIn(@Body() stockInDto: StockInDto, @Request() req) {
    return this.stockService.stockIn(stockInDto, req.user.id);
  }

  @Post('out')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.STOREKEEPER)
  stockOut(@Body() stockOutDto: StockOutDto, @Request() req) {
    return this.stockService.stockOut(stockOutDto, req.user.id);
  }

  @Get('movements')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.STOREKEEPER)
  getMovements(
    @Query('productId') productId?: string,
    @Query('type') type?: StockMovementType,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filters: any = {};
    
    if (productId) filters.productId = productId;
    if (type) filters.type = type;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    return this.stockService.getMovements(filters);
  }
}

