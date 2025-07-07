import exprss from "express";
const router = exprss.Router();
import cors from "cors";
import loginRouter from "./login.js";
import authenticateUser from "./authmiddleware.js";
import categoryRouter from "./category.js";
import serviceRouter from "./service.js";

router.use(cors());

//login router.....
router.use("/api", loginRouter);
// category curd endpoints....
router.use("/api", authenticateUser, categoryRouter);
router.use("/api", authenticateUser, serviceRouter);

export default router;