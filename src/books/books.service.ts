import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books = [];

  create(createBookDto: CreateBookDto) {
    const book = { id: Date.now().toString(), ...createBookDto };
    this.books.push(book);
    return book;
  }

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books[index] = { ...this.books[index], ...updateBookDto };
    return this.books[index];
  }

  remove(id: string) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(index, 1);
    return { message: 'Book successfully deleted' };
  }
}
