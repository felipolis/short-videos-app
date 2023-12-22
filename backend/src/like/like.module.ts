import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { PrismaService } from 'src/prisma.service';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    LikeService,
    LikeResolver,
    PrismaService,
    GraphqlAuthGuard,
    ConfigService,
  ],
})
export class LikeModule {}
