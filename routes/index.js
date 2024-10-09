const express = require('express');
const router = express.Router();

router.all('/json', (req, res, next) => {
  res.json({ now: new Date().toString() });
});

module.exports = router;
