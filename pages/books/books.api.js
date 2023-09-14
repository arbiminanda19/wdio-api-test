require("dotenv").config();
const { BASE_URL } = process.env;

const bookStorePrefixURL = `${BASE_URL}/BookStore/v1`;

module.exports = {
  books: `${bookStorePrefixURL}/Books`,
};
