import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity'; // Import the Book entity
import { CreateBookDto, UpdateBookDto } from './dto/book.dto'; // Assuming you have DTOs for validation

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>, // Inject the repository for Book
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      if (
        !createBookDto.title ||
        !createBookDto.author ||
        !createBookDto.isbn
      ) {
        throw new BadRequestException('Title, Author, and ISBN are required');
      }

      // Create a new book entity and save it to the database
      const book = this.booksRepository.create(createBookDto);
      return await this.booksRepository.save(book);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error occurred while creating the book',
      );
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.booksRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while retrieving books',
      );
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      // Use the correct syntax for `findOne` method with `where` object
      const book = await this.booksRepository.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error occurred while retrieving the book',
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      // Use `findOne` with `where` clause
      const book = await this.booksRepository.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      Object.assign(book, updateBookDto); // Merge the updated fields
      return await this.booksRepository.save(book);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error occurred while updating the book',
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Use `findOne` with `where` clause
      const book = await this.booksRepository.findOne({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      await this.booksRepository.remove(book);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error occurred while deleting the book',
      );
    }
  }
}
