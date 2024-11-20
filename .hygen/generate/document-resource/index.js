const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};
const formatCamals = (input) => {
  let arr = input.trim().split(' ');
  for (let i = 1; i < arr.length; i++)
    if (arr[i]) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  return arr.join('');
};
const eqValueFormat = (values, field) => {
  values[field] = values[field]
    .trim()
    .split(' ')
    .map((word, index) => {
      if (index == 0) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
  values[field.charAt(0).toUpperCase() + field.slice(1)] =
    values[field].charAt(0).toUpperCase() + values[field].slice(1);
  return values;
};
module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "Entity name (e.g. 'User' or 'orderItem')",
        validate: (input) => {
          if (!input.trim()) {
            return 'Entity name is required';
          }
          return true;
        },
        format: (input) => {
          return formatCamals(input);
        },
      })
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'name');
        }),
      ),
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
