const {
  REQUEST_VALID_GENERATE_TOKEN,
} = require("../../data/account/account.data");
const { getToken } = require("../../helper/getToken");

describe("API Test Suite", () => {
  it("should return a 200 status code", async () => {
    const token = await getToken(REQUEST_VALID_GENERATE_TOKEN);
    console.log(token);
  });
});
