import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Resolver, Query } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CommentService } from './comment.service';
import { Mutation } from '@nestjs/graphql';

import { User } from 'src/user/user.model';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { Comment } from './comment.type';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query((returns) => [Comment])
  async getCommentsByPostId(@Args('postId') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => Comment)
  createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() ctx: { req: Request },
  ) {
    return this.commentService.createComment({
      text: text,
      postId: postId,
      userId: ctx.req.user.sub,
    });
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number, @Context() ctx: { req: Request }) {
    return this.commentService.deleteComment(id, ctx.req.user.sub);
  }
}
