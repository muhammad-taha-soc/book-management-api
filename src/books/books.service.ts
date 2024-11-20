import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books = [];

  create(createBookDto: CreateBookDto) {
    try {
      // Validate the incoming data (example check)
      if (
        !createBookDto.title ||
        !createBookDto.author ||
        !createBookDto.isbn
      ) {
        throw new BadRequestException('Title, Author, and ISBN are required');
      }

      // Create a new book and add to the array (simulating DB save)
      const book = { id: Date.now().toString(), ...createBookDto };
      this.books.push(book);
      return book;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-throw BadRequestException for validation errors
      }
      throw new InternalServerErrorException(
        'Error occurred while creating the book',
      );
    }
  }

  findAll() {
    try {
      // Return the list of books (simulating DB fetch)
      return this.books;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while retrieving books',
      );
    }
  }

  findOne(id: string) {
    try {
      const book = this.books.find((book) => book.id === id);
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException if book is not found
      }
      throw new InternalServerErrorException(
        'Error occurred while retrieving the book',
      );
    }
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      // Validate the incoming data (example check)
      if (updateBookDto.title && !updateBookDto.author) {
        throw new BadRequestException('Both title and author are required');
      }

      // Update the book data
      this.books[index] = { ...this.books[index], ...updateBookDto };
      return this.books[index];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException if book not found
      }
      if (error instanceof BadRequestException) {
        throw error; // Re-throw BadRequestException for validation issues
      }
      throw new InternalServerErrorException(
        'Error occurred while updating the book',
      );
    }
  }

  remove(id: string) {
    try {
      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      this.books.splice(index, 1); // Remove the book
      return { message: 'Book successfully deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException if book not found
      }
      throw new InternalServerErrorException(
        'Error occurred while deleting the book',
      );
    }
  }
}
