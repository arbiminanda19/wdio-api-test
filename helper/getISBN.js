const axios = require("axios");
const BOOK_STORE_API = require("../pages/books/books.api");

const getISBN = async () => {
  const response = await axios.get(BOOK_STORE_API.books);
  return response.data.books[0].isbn;
};

module.exports = {
  getISBN,
};
