require("dotenv").config();
const { USER_ID } = process.env;

let REQUEST_VALID_ADD_LIST_OF_BOOKS = {
  userId: USER_ID,
  collectionOfIsbns: [
    {
      isbn: "9781449325862",
    },
  ],
};

module.exports = {
  REQUEST_VALID_ADD_LIST_OF_BOOKS,
};
