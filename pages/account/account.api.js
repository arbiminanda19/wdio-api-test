require("dotenv").config();
const { BASE_URL } = process.env;

const accountPrefixURL = `${BASE_URL}/Account/v1`;

module.exports = {
  generateToken: `${accountPrefixURL}/GenerateToken`,
};
