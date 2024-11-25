const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};
const formatCamals = (input, index) => {
  let arr = input.trim().split(' ');
  let i = index;
  for (i; i < arr.length; i++)
    if (arr[i]) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  return arr.join('');
};
const eqValueFormat = (values, field) => {
  values[field.charAt(0).toUpperCase() + field.slice(1)] = values[field]
    .trim()
    .split(' ')
    .map((word, index) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
  values[field] =
    values[field.charAt(0).toUpperCase() + field.slice(1)]
      .charAt(0)
      .toLowerCase() +
    values[field.charAt(0).toUpperCase() + field.slice(1)].slice(1);
  return values;
};

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "Entity name (e.g. 'User')",
        validate: (input) => {
          if (!input.trim()) {
            return 'Entity name is required';
          }

          return true;
        },
        format: (input) => {
          return formatCamals(input, 0);
        },
      })
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'name');
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'input',
            name: 'object',
            message: "Object name (e.g. 'address')",
            validate: (input) => {
              if (!input.trim()) {
                return 'Object name is required';
              }
              return true;
            },
            format: (input) => {
              return formatCamals(input, 1);
            },
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'object');
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'input',
            name: 'property',
            message: "Property name (e.g. 'firstName')",
            validate: (input) => {
              if (!input.trim()) {
                return 'Property name is required';
              }

              return true;
            },
            format: (input) => {
              return formatCamals(input, 1);
            },
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'property');
        }),
      )
      .then(
        collectPromisesResults((rootValues) => {
          return prompter
            .prompt({
              type: 'select',
              name: 'kind',
              message: 'Select kind of type',
              choices: [
                {
                  message: 'Primitive (string, number, etc)',
                  value: 'primitive',
                },
                { message: 'Enum type', value: 'enum' },
                { message: 'Reference to entity', value: 'reference' },
              ],
            })
            .then(
              collectPromisesResults((values) => {
                if (values.kind === 'reference') {
                  return prompter
                    .prompt({
                      type: 'input',
                      name: 'type',
                      message: "Entity name (e.g. 'File')",
                      validate: (input) => {
                        if (!input.trim()) {
                          return 'Entity name is required';
                        }

                        return true;
                      },
                      format: (input) => {
                        return formatCamals(input, 0);
                      },
                    })
                    .then(
                      collectPromisesResults((values) => {
                        return eqValueFormat(values, 'type');
                      }),
                    )
                    .then(
                      collectPromisesResults((referenceValues) => {
                        return prompter.prompt({
                          type: 'select',
                          name: 'referenceType',
                          message: 'Select type of reference',
                          choices: [
                            {
                              message: `One to one (${rootValues.object} contains only one instance of ${referenceValues.type}, and ${referenceValues.type} contains only one instance of ${rootValues.object}. ${rootValues.property}: ${referenceValues.type})`,
                              value: 'oneToOne',
                            },
                            {
                              message: `One to many (${rootValues.object} contains multiple instances of ${referenceValues.type}, but ${referenceValues.type} contains only one instance of ${rootValues.object}. ${rootValues.property}: ${referenceValues.type}[])`,
                              value: 'oneToMany',
                            },
                            {
                              message: `Many to one (${rootValues.object} contains only one instance of ${referenceValues.type}, but ${referenceValues.type} contains multiple instances of ${rootValues.object}. ${rootValues.property}: ${referenceValues.type})`,
                              value: 'manyToOne',
                            },
                            {
                              message: `Many to many (${rootValues.object} contains multiple instances of ${referenceValues.type}, and ${referenceValues.type} contains multiple instances of ${rootValues.object}. ${rootValues.property}: ${referenceValues.type}[])`,
                              value: 'manyToMany',
                            },
                          ],
                        });
                      }),
                    );
                } else if (values.kind === 'enum') {
                  return prompter
                    .prompt({
                      type: 'input',
                      name: 'enumType',
                      message: "Enum name (e.g. 'FileStatus')",
                      validate: (input) => {
                        if (!input.trim()) {
                          return 'Enum name is required';
                        }
                        return true;
                      },
                      format: (input) => {
                        return formatCamals(input, 1);
                      },
                    })
                    .then(
                      collectPromisesResults((values) => {
                        return eqValueFormat(values, 'enumType');
                      }),
                    )
                    .then(
                      collectPromisesResults((values) => {
                        return prompter.prompt({
                          type: 'input',
                          name: 'enumValue',
                          message:
                            'Enter an initial value for this enum like : ADMIN USER',
                        });
                      }),
                    );
                } else if (values.kind === 'primitive')
                  return prompter.prompt({
                    type: 'select',
                    name: 'type',
                    message: 'Property type',
                    choices: ['string', 'number', 'boolean'],
                  });
              }),
            );
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind === 'reference')
            return prompter.prompt({
              type: 'confirm',
              name: 'deleteChildren',
              message: 'do you delete children when the parent is deleted?',
              initial: true,
            });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (
            values.referenceType !== 'manyToMany' &&
            values.referenceType !== 'oneToMany' &&
            values.kind !== 'object'
          )
            return prompter.prompt({
              type: 'confirm',
              name: 'isRequired',
              message: 'do you make it required?',
              initial: true,
            });
          return;
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind !== 'reference')
            return prompter.prompt({
              type: 'confirm',
              name: 'isArray',
              message: 'do you want it to be a Array?',
              initial: true,
            });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind === 'primitive' && values.type === 'string')
            return prompter.prompt({
              type: 'confirm',
              name: 'isText',
              message: 'do you want it to be a index?',
              initial: true,
            });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind === 'primitive' && values.type === 'string')
            return prompter.prompt({
              type: 'confirm',
              name: 'isUnique',
              message: 'do you make it unique?',
              initial: true,
            });
          return;
        }),
      )
      .then(
        collectPromisesResults((values) => {
          return prompter.prompt({
            type: 'confirm',
            name: 'hiddenSwagger',
            message: 'do you want a hidden field.',
            initial: false,
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind === 'primitive')
            return prompter.prompt({
              type: 'input',
              name: 'example',
              message: 'set example for swagger :',
            });
          return;
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (!values.type) {
            values.type = 'user';
          }
          if (!values.isArray) {
            values.isArray = false;
          }
          return;
        }),
      ),
};
