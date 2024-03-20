process.env.NODE_ENV = "test";

const db = require("../db");
const Book = require("../models/book");
const app = require("../app");
const request = require("supertest");

describe("Test Book class", () => {
  // do this beforeEach test
  beforeEach(async () => {
    await db.query("DELETE FROM books");
    // create and add a new book in the database.
    let book = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    });
  });
  test("POST /books - register a new book", async () => {
    let bookData = {
      isbn: "0691161519",
      amazon_url: "http://a.co/eobPtX3",
      author: "Micky Mouse",
      language: "english",
      pages: 254,
      publisher: "Eboore University Press",
      title: "Explore: Findind the Hidden Life Gems",
      year: 2020,
    };
    const response = await request(app).post("/books/").send(bookData);
    const book = response.body.book;

    expect(book.isbn).toBe("0691161519");
    expect(book.title).toBe("Explore: Findind the Hidden Life Gems");
  });

  test("POST /books - register with missing year", async () => {
    let bookData = {
      isbn: "0691161517",
      amazon_url: "http://a.co/eobPtX1",
      author: "Done Matty",
      language: "english",
      pages: 254,
      publisher: "River University Press",
      title: "Failed Attempt",
    };
    const response = await request(app).post("/books/").send(bookData);
    console.log(response.body);
    const res = response.body;
    expect(res.error.status).toBe(400);
    const expectedArray = ['instance requires property "year"'];
    expect(res.error.message).toEqual(expectedArray);
  });

  test("GET /books - Get all books", async () => {
    const response = await request(app).get("/books");
    const res = response.body;

    expect(res.books.length).toBe(1);
    expect(res.books[0].isbn).toBe("0691161518");
  });

  test("GET /books/:isbn - Get a book", async () => {
    const isbn = "0691161518";
    const response = await request(app).get(`/books/${isbn}`);
    const book = response.body.book;

    expect(book.isbn).toBe("0691161518");
    expect(book.title).toBe(
      "Power-Up: Unlocking the Hidden Mathematics in Video Games"
    );
  });

  test("GET /books/:isbn - Get an invalid isbn", async () => {
    const isbn = "069116151811";
    const response = await request(app).get(`/books/${isbn}`);
    const res = response.body;
    expect(res.error.status).toBe(404);
  });

  test("PUT /books/:isbn - Update a book", async () => {
    const isbn = "0691161518";
    const updatedBook = {
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX11",
      author: "Samie Smilz",
      language: "english",
      pages: 274,
      publisher: "Eboore University Press",
      title: "The future of humans.",
      year: 2018,
    };
    const response = await request(app).put(`/books/${isbn}`).send(updatedBook);
    const book = response.body.book;

    expect(book).toEqual(updatedBook);
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /books/:isbn - Delete a book", async () => {
    const isbn = "0691161518";
    const response = await request(app).delete(`/books/${isbn}`);
    const res = response.body;
    expect(response.statusCode).toBe(200);
    expect(res.message).toBe("Book deleted");
  });
});

// After all tests - end database connection.
afterAll(async function () {
  await db.end();
});
