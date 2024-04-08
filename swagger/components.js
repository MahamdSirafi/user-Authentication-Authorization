exports.Error = {
  type: "object",
  properties: { status: { type: "string" }, message: { type: "string" } },
};
exports.DuplicateEmail = {
  description: "Email already taken",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" },
      example: { status: "error", message: "Email already taken" },
    },
  },
};
exports.Unauthorized = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" },
      example: { status: "error", message: "Please authenticate" },
    },
  },
};
exports.Forbidden = {
  description: "Forbidden",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" },
      example: { status: "error", message: "Forbidden" },
    },
  },
};

exports.NotFound = {
  description: "Not found",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" },
      example: { status: "error", message: "Not found" },
    },
  },
};
