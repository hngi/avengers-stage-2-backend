const express = require("express");

const router = express.Router();

router.get("/hello", function (req, res) {
    return res.status(200).send({
          success: true,
          message: "Hello world"
        });
} );

module.exports = router;