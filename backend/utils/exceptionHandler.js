// 익셉션 핸들러
const catchExceptions = func => (req, res, next) => {
  Promise.resolve(func(req, res)).catch(err => {
    if (process.env.NODE_ENV === "development") console.log(err);
    res.status(500).send({
      meta: {
        type: "error",
        status: 500,
        message: "server error"
      }
    });
    next();
  });
};

module.exports = catchExceptions;