const axios = require("axios");
const request = require("supertest");
const { expect: chaiExpect } = require("chai");
const chai = require("chai");
const jsonSchema = require("chai-json-schema");
const {
  REQUEST_VALID_GENERATE_TOKEN,
} = require("../../data/account/account.data");
const schema = require("../../schema/books/books.schema");
const data = require("../../data/books/books.data");
const { getToken } = require("../../helper/getToken");
const { getISBN } = require("../../helper/getISBN");
const BOOK_STORE_API = require("../../pages/books/books.api");

let token, isbn, headers, userId;
chai.use(jsonSchema);

before(async () => {
  token = await getToken(REQUEST_VALID_GENERATE_TOKEN);
  isbn = await getISBN();
});

beforeEach(async () => {
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
});

describe("BookStore Collection API Test", () => {
  it("should success delete all of list books", async () => {
    const response = await axios.delete(
      `${BOOK_STORE_API.books}?UserId=${data.REQUEST_VALID_DELETE_LIST_BOOKS.userId}`,
      { headers }
    );
    expect(response.status).toEqual(data.RESPONSE_VALID_DELETE_LIST_BOOKS.code);
  });

  it("should success add list of books", async () => {
    data.REQUEST_VALID_ADD_LIST_OF_BOOKS.collectionOfIsbns[0].isbn = isbn;
    const response = await axios.post(
      BOOK_STORE_API.books,
      data.REQUEST_VALID_ADD_LIST_OF_BOOKS,
      { headers }
    );
    expect(response.status).toEqual(data.RESPONSE_VALID_ADD_LIST_OF_BOOKS.code);
    chaiExpect(response.data).to.be.jsonSchema(
      schema.VALID_ADD_LIST_OF_BOOKS_SCHEMA
    );
  });

  it("should failed delete all of list books with incorrect user id", async () => {
    const response = await request(
      `${BOOK_STORE_API.books}?UserId=${data.REQUEST_DELETE_LIST_BOOKS_INCORECT_USER.userId}`
    )
      .delete("")
      .set(headers);
    expect(response.status).toEqual(data.RESPONSE_INCORECT_USER.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_INCORECT_USER.error_code
    );
    expect(response.body.message).toEqual(data.RESPONSE_INCORECT_USER.message);
    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });

  it("should failed delete all of list books with unauthorized user", async () => {
    headers.Authorization = null;
    const response = await request(
      `${BOOK_STORE_API.books}?UserId=${data.REQUEST_VALID_DELETE_LIST_BOOKS.userId}`
    )
      .delete("")
      .set(headers);
    expect(response.status).toEqual(data.RESPONSE_UNAUTHORIZED_USER.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_UNAUTHORIZED_USER.error_code
    );
    expect(response.body.message).toEqual(
      data.RESPONSE_UNAUTHORIZED_USER.message
    );
    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });

  it("should failed add list of books with incorrect user", async () => {
    const response = await request(BOOK_STORE_API.books)
      .post("")
      .set(headers)
      .send(data.REQUEST_ADD_LIST_OF_BOOKS_INCORRECT_USER);

    expect(response.status).toEqual(data.RESPONSE_INCORECT_USER.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_INCORECT_USER.error_code
    );
    expect(response.body.message).toEqual(data.RESPONSE_INCORECT_USER.message);

    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });

  it("should failed add list of books with unauthorized user", async () => {
    headers.Authorization = null;
    const response = await request(BOOK_STORE_API.books)
      .post("")
      .set(headers)
      .send(data.REQUEST_VALID_ADD_LIST_OF_BOOKS);

    expect(response.status).toEqual(data.RESPONSE_UNAUTHORIZED_USER.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_UNAUTHORIZED_USER.error_code
    );
    expect(response.body.message).toEqual(
      data.RESPONSE_UNAUTHORIZED_USER.message
    );
    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });

  it("should failed add list of books with unavailable ISBN", async () => {
    const response = await request(BOOK_STORE_API.books)
      .post("")
      .set(headers)
      .send(data.REQUEST_ADD_LIST_OF_BOOKS_UNAVAILABLE_ISBN);

    expect(response.status).toEqual(data.RESPONSE_UNAVAILABLE_ISBN.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_UNAVAILABLE_ISBN.error_code
    );
    expect(response.body.message).toEqual(
      data.RESPONSE_UNAVAILABLE_ISBN.message
    );
    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });

  it("should failed add list of books with ISBN that already exist on list", async () => {
    data.REQUEST_VALID_ADD_LIST_OF_BOOKS.collectionOfIsbns[0].isbn = isbn;
    const response = await request(BOOK_STORE_API.books)
      .post("")
      .set(headers)
      .send(data.REQUEST_VALID_ADD_LIST_OF_BOOKS);

    expect(response.status).toEqual(data.RESPONSE_ISBN_ALREADY_EXIST.code);
    expect(Number(response.body.code)).toEqual(
      data.RESPONSE_ISBN_ALREADY_EXIST.error_code
    );
    expect(response.body.message).toEqual(
      data.RESPONSE_ISBN_ALREADY_EXIST.message
    );
    chaiExpect(response.body).to.be.jsonSchema(
      schema.INVALID_ALL_BOOKS_REQUEST_SCHEMA
    );
  });
});
