import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../config/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ERROR_MESSAGES } from '../../../../constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          role: registerDto.role,
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return {
        user,
        accessToken: this.jwtService.sign({ userId: user.id, email: user.email, role: user.role }),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email, role: user.role }),
    };
  }
}

