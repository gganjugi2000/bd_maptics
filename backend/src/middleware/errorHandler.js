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

    // if ( error.code === 400 ) error.text = `ERROR 400: BAD REQUEST.\n${error.text}`;
    // if ( error.code === 404 ) error.text = `ERROR 404: NOT FOUND.\n${error.text}`;
    // if ( error.code === 500 ) error.text = `ERROR 500: INTERNAL SERVER ERROR.\n${error.text}`;
    // if ( error.name === 'CastError' )
    //     return res.status( 500 ).send( 'ERROR:\nSomething went wrong' );
    // if ( error.code )
    //     res.status( error.code ).send( error.text );
    // else 
    //     res.send( error.name + ' -> ' + error.message );
};


const asyncUtil = fn =>
function asyncUtilWrap(...args) {
  const fnReturn = fn(...args);
  const next = args[args.length-1];
  return Promise.resolve(fnReturn).catch(next);
}

module.exports = asyncUtil;