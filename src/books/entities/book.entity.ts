import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string; // Using UUID as a primary key

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;
}