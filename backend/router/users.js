const router = require('express').Router();
const utils = require("../common/util/utils");


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
  let {email, password} = req.body;
  // 유저로그인 작업

  //임시 - token 발급
  const token = utils.generateToken(email);

  return res.status(200).json({
    success: true,
    email,
    password,
    token
  })
});

router.get('/info', (req, res) => {
  console.log('router api users info called');
  res.status(200).send({"success": true, "message": 'all right!!!'});
});


module.exports = router;
