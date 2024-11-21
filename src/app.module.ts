import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module'; // Assuming books module exists
import { Book } from './books/entities/book.entity'; // Assuming you have a Book entity defined
import { ConfigModule } from '@nestjs/config'; // Optional: If using environment variables for configuration
@Module({
  imports: [
    ConfigModule.forRoot(), // If you want to load env variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book], // Add the Book entity here
      synchronize: true, // Set to false in production to avoid data loss
    }),
    BooksModule, // Assuming your book-related logic is in a BooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}