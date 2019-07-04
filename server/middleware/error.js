module.exports = app => (err, req, res, next) => {
  console.error(err.statusCode, err.message);
  res.status(err.statusCode).send(err.message);
};
