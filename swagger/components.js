exports.Error = {
  type: 'object',
  properties: { status: { type: 'string' }, message: { type: 'string' } },
};
exports.DuplicateEmail = {
  description: 'Email already taken',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: { status: 'error', message: 'Email already taken' },
    },
  },
};
exports.Unauthorized = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'You are not logged in! Please log in to get access.',
      },
    },
  },
};
exports.Forbidden = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'You do not have permission to perform this action',
      },
    },
  },
};

exports.NotFound = {
  description: 'Not found',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: "Can't find  /cars/id   on this server!",
      },
    },
  },
};
