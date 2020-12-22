// catch async calls the function which is passed to it's parameters (fn)
// and then returns another function which calls function passed as parameter
// and catches the errors if there are any.
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // the same as .catch(err => next(err))
};
