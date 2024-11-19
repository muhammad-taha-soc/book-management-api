import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsISBN } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'The ISBN number of the book',
    example: '9780743273565',
  })
  @IsISBN()
  isbn: string;
}

export class UpdateBookDto {
  @ApiProperty({
    description: 'The updated title of the book',
    example: 'The Great Gatsby Revised',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The updated author of the book',
    example: 'F. Scott Fitzgerald Revised',
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'The updated ISBN number of the book',
    example: '9780743273566',
  })
  @IsISBN()
  isbn: string;
}
