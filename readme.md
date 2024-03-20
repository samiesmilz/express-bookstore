Certainly! Below is the README content in markdown format:

````markdown
# Book API

This is a simple Express.js application for managing books. It provides RESTful endpoints for CRUD operations on books.

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up your database connection in the `config.js` file.
5. Run `npm start` to start the server.

## Endpoints

- **GET /books**: Retrieves a list of all books.
- **GET /books/:id**: Retrieves details of a specific book by ID.
- **POST /books**: Creates a new book.
- **PUT /books/:isbn**: Updates an existing book by ISBN.
- **DELETE /books/:isbn**: Deletes a book by ISBN.

## Request and Response Formats

### GET /books

Response:

```json
{
  "books": [
    {
      "id": "1",
      "title": "Sample Book",
      "author": "John Doe",
      "isbn": "1234567890"
      // Other book properties
    }
    // Additional books...
  ]
}
```
````

### GET /books/:id

Response:

```json
{
  "book": {
    "id": "1",
    "title": "Sample Book",
    "author": "John Doe",
    "isbn": "1234567890"
    // Other book properties
  }
}
```

### POST /books

Request:

```json
{
  "title": "New Book",
  "author": "Jane Smith",
  "isbn": "0987654321"
  // Other book properties
}
```

Response:

```json
{
  "book": {
    "id": "2",
    "title": "New Book",
    "author": "Jane Smith",
    "isbn": "0987654321"
    // Other book properties
  }
}
```

### PUT /books/:isbn

Request:

```json
{
  "title": "Updated Book Title"
  // Other updated book properties
}
```

Response:

```json
{
  "book": {
    "id": "2",
    "title": "Updated Book Title",
    "author": "Jane Smith",
    "isbn": "0987654321"
    // Other updated book properties
  }
}
```

### DELETE /books/:isbn

Response:

```json
{
  "message": "Book deleted"
}
```

## Error Handling

- If a request fails validation, a 400 Bad Request error is returned with a list of validation errors.
- Other errors are returned as JSON with appropriate HTTP status codes.

## Environment

Make sure to set `process.env.NODE_ENV` to `"test"` inside your test file before running tests. This ensures proper environment configuration during testing.

```

```
