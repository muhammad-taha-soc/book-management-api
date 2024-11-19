# Book Inventory API

This is a simple book inventory management system built using NestJS with Swagger integration.

## Running the Application

1. Clone the repository and install dependencies:
    ```bash
    npm install
    ```

2. Run the application:
    ```bash
    npm run start
    ```

3. Access Swagger UI at:
    ```
    http://localhost:3000/api-docs
    ```

## Endpoints

- **GET /books** - Retrieve all books.
- **GET /books/:id** - Retrieve a book by ID.
- **POST /books** - Add a new book.
- **PUT /books/:id** - Update a book by ID.
- **DELETE /books/:id** - Delete a book by ID.
