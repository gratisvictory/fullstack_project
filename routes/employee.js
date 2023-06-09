const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add, remove, employeeID, edit } = require('../controllers/employee')

router.get("/",auth, all);
router.get("/:id", auth, employeeID);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
