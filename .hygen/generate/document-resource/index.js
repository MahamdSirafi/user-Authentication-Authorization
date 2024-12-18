const { RoleCode } = require('../../../utils/enum');

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
        message: "Entity name (e.g. 'User' or 'orderItem')",
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
            type: 'multiselect',
            name: 'roleGet',
            message: 'choose role for GET',
            choices: Object.keys(RoleCode).map((key, index) => {
              return { name: key, value: key };
            }),
          });
        }),
      )

      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'multiselect',
            name: 'rolePost',
            message: 'choose role for Post',
            choices: Object.keys(RoleCode).map((key, index) => {
              return { name: key, value: key };
            }),
          });
        }),
      )

      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'multiselect',
            name: 'roleDelete',
            message: 'choose role for Delete',
            choices: Object.keys(RoleCode).map((key, index) => {
              return { name: key, value: key };
            }),
          });
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'multiselect',
            name: 'roleUpdate',
            message: 'choose role for update',
            choices: Object.keys(RoleCode).map((key, index) => {
              return { name: key, value: key };
            }),
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          values.allRole = Object.keys(RoleCode).map((key, index) => {
            return key;
          });
        }),
      ),
};
