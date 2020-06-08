import { Router } from "express";

const router = Router();

router.get("/hello", function (req, res) {
    return res.status(200).send({
          success: true,
          message: "Hello world"
        });
} );

export default router;