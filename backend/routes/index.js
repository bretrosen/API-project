const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


// connect api router
router.use('/api', apiRouter);

// allow easy retrieval of XSRF token
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});



module.exports = router;
