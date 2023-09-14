require("dotenv").config();
const { USERNAME, PASSWORD } = process.env;

const REQUEST_VALID_GENERATE_TOKEN = {
  userName: USERNAME,
  password: PASSWORD,
};

module.exports = {
  REQUEST_VALID_GENERATE_TOKEN,
};
