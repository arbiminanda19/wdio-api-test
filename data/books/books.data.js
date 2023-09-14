require("dotenv").config();
const { USER_ID } = process.env;

let REQUEST_VALID_ADD_LIST_OF_BOOKS = {
  userId: USER_ID,
  collectionOfIsbns: [
    {
      isbn: "",
    },
  ],
};

const REQUEST_ADD_LIST_OF_BOOKS_INCORRECT_USER = {
  userId: "IncorrectUserId",
  collectionOfIsbns: [
    {
      isbn: "",
    },
  ],
};

let REQUEST_ADD_LIST_OF_BOOKS_UNAVAILABLE_ISBN = {
  userId: USER_ID,
  collectionOfIsbns: [
    {
      isbn: "UnavailableISBN",
    },
  ],
};

let RESPONSE_UNAVAILABLE_ISBN = {
  code: 400,
  error_code: 1205,
  message: "ISBN supplied is not available in Books Collection!",
};

let RESPONSE_ISBN_ALREADY_EXIST = {
  code: 400,
  error_code: 1210,
  message: "ISBN already present in the User's Collection!",
};

let RESPONSE_VALID_ADD_LIST_OF_BOOKS = {
  code: 201,
};

const REQUEST_VALID_DELETE_LIST_BOOKS = {
  userId: USER_ID,
};

let RESPONSE_VALID_DELETE_LIST_BOOKS = {
  code: 204,
};

const REQUEST_DELETE_LIST_BOOKS_INCORECT_USER = {
  userId: "IncorrectUserId",
};

let RESPONSE_INCORECT_USER = {
  code: 401,
  error_code: 1207,
  message: "User Id not correct!",
};

let RESPONSE_UNAUTHORIZED_USER = {
  code: 401,
  error_code: 1200,
  message: "User not authorized!",
};

module.exports = {
  REQUEST_VALID_ADD_LIST_OF_BOOKS,
  REQUEST_ADD_LIST_OF_BOOKS_INCORRECT_USER,
  REQUEST_ADD_LIST_OF_BOOKS_UNAVAILABLE_ISBN,
  REQUEST_VALID_DELETE_LIST_BOOKS,
  REQUEST_DELETE_LIST_BOOKS_INCORECT_USER,
  RESPONSE_VALID_ADD_LIST_OF_BOOKS,
  RESPONSE_VALID_DELETE_LIST_BOOKS,
  RESPONSE_INCORECT_USER,
  RESPONSE_UNAUTHORIZED_USER,
  RESPONSE_UNAVAILABLE_ISBN,
  RESPONSE_ISBN_ALREADY_EXIST,
};
