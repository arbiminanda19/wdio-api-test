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

module.exports = {
  VALID_ADD_LIST_OF_BOOKS_SCHEMA,
};
