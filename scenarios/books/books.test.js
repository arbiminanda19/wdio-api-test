const {
  REQUEST_VALID_GENERATE_TOKEN,
} = require("../../data/account/account.data");
const { getToken } = require("../../helper/getToken");

async function main() {
  try {
    const token = await getToken(REQUEST_VALID_GENERATE_TOKEN);
    console.log(token);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
