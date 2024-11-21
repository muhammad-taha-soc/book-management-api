import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity'; // Import the Book entity

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // Register Book entity with TypeORM
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
