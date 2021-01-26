const express = require('express');

const router = express.Router()

router.route('/auth/signin').post(userSignIn);
router.route('/auth/signout').get(userSignOut);

module.exports = router;