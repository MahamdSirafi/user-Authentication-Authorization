const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter.prompt({
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
    }),
  // .then(
  //   collectPromisesResults(() => {
  //     return prompter.prompt({
  //       type: 'input',
  //       name: 'role',
  //       message: "role name (e.g. 'ADMIN/USER')",
  //       validate: (input) => {
  //         if (!input.trim()) {
  //           return 'role is required';
  //         }

  //         return true;
  //       },
  //       format: (input) => {
  //         return input.trim();
  //       },
  //     });
  //   }),
  // ),
};
