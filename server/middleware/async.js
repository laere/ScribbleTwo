// Middleware that takes a function and wraps it into a Promise
// Will resolve with the value that route handler returns.
// If an await statement errors out it catches the error and passes to next
const myAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = myAsync;
