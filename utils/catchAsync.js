module.exports = (fn) => {
  return (req, res, next) => {
    if (typeof next !== 'function') {
      console.log('❌ next is not a function HERE:', fn.name);
      console.log('ARGS:', { req, res, next });
    }

    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
