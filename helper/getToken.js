const axios = require("axios");
const ACCOUNT_API = require("../pages/account/account.api");

const getToken = async (account_data) => {
  const response = await axios.post(ACCOUNT_API.generateToken, account_data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.token;
};

module.exports = {
  getToken,
};
