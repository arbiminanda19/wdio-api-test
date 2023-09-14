const VALID_ADD_LIST_OF_BOOKS_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    books: {
      type: "array",
      items: {
        type: "object",
        properties: {
          isbn: {
            type: "string",
          },
        },
        required: ["isbn"],
      },
    },
  },
  required: ["books"],
};

const INVALID_ALL_BOOKS_REQUEST_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    code: {
      type: "string",
      pattern: "^[0-9]{4}$", // Pattern to validate a 4-digit code
    },
    message: {
      type: "string",
    },
  },
  required: ["code", "message"],
};

module.exports = {
  VALID_ADD_LIST_OF_BOOKS_SCHEMA,
  INVALID_ALL_BOOKS_REQUEST_SCHEMA,
};
