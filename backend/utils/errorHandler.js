// 에러 처리용 핸들러
exports.errors = (err, res) => {
    if (process.env.NODE_ENV !== "production") console.log(err);
    res.status(500).send({
        meta: {
            type: "error",
            status: 500,
            message: "server error"
        }
    });
};