const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
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
          return input.trim();
        },
      })
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
              return input.trim();
            },
          });
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
                {
                  message: 'Duplication data from entity',
                  value: 'duplication',
                },
                {
                  message: 'Object',
                  value: 'object',
                },
              ],
            })
            .then(
              collectPromisesResults((values) => {
                if (
                  values.kind === 'reference' ||
                  values.kind === 'duplication'
                ) {
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
                        return input.trim();
                      },
                    })
                    .then(
                      collectPromisesResults((referenceValues) => {
                        return prompter.prompt({
                          type: 'select',
                          name: 'referenceType',
                          message: 'Select type of reference',
                          choices: [
                            {
                              message: `One to one (${rootValues.name} contains only one instance of ${referenceValues.type}, and ${referenceValues.type} contains only one instance of ${rootValues.name}. ${rootValues.property}: ${referenceValues.type})`,
                              value: 'oneToOne',
                            },
                            {
                              message: `One to many (${rootValues.name} contains multiple instances of ${referenceValues.type}, but ${referenceValues.type} contains only one instance of ${rootValues.name}. ${rootValues.property}: ${referenceValues.type}[])`,
                              value: 'oneToMany',
                            },
                            {
                              message: `Many to one (${rootValues.name} contains only one instance of ${referenceValues.type}, but ${referenceValues.type} contains multiple instances of ${rootValues.name}. ${rootValues.property}: ${referenceValues.type})`,
                              value: 'manyToOne',
                            },
                            {
                              message: `Many to many (${rootValues.name} contains multiple instances of ${referenceValues.type}, and ${referenceValues.type} contains multiple instances of ${rootValues.name}. ${rootValues.property}: ${referenceValues.type}[])`,
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
                        return input.trim();
                      },
                    })
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
          if (
            values.referenceType !== 'manyToMany' &&
            values.referenceType !== 'manyToOne' &&
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
          if (
            values.referenceType !== 'manyToMany' &&
            values.referenceType !== 'manyToOne' &&
            values.kind !== 'enum' &&
            values.kind !== 'object'
          )
            return prompter.prompt({
              type: 'confirm',
              name: 'isUnique',
              message: 'do you make it unique?',
              initial: true,
            });
          return;
        }),
      ),
};
