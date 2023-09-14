const axios = require("axios");
const {
  REQUEST_VALID_GENERATE_TOKEN,
} = require("../../data/account/account.data");
const {
  REQUEST_VALID_ADD_LIST_OF_BOOKS,
} = require("../../data/books/books.data");
const { getToken } = require("../../helper/getToken");
const { getISBN } = require("../../helper/getISBN");
const BOOK_STORE_API = require("../../pages/books/books.api");

let token, isbn, headers;

before(async () => {
  token = await getToken(REQUEST_VALID_GENERATE_TOKEN);
  isbn = await getISBN();
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  REQUEST_VALID_ADD_LIST_OF_BOOKS.collectionOfIsbns[0].isbn = isbn;
});

describe("BookStore Collection API Test", () => {
  it("should success add list of books", async () => {
    const response = await axios.post(
      BOOK_STORE_API.books,
      REQUEST_VALID_ADD_LIST_OF_BOOKS,
      { headers }
    );
    expect(response.status).toEqual(201);
  });

  it("should success delete all of list books", async () => {
    const response = await axios.delete(
      `${BOOK_STORE_API.books}?UserId=${REQUEST_VALID_ADD_LIST_OF_BOOKS.userId}`,
      { headers }
    );
    expect(response.status).toEqual(204);
  });
});
