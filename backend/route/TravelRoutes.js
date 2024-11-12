const express = require('express');
const router = express.Router();
const Travel = require("../controller/TravelController");

router.post('/create', Travel.create);
router.get('/', Travel.get);
router.get('/:id', Travel.getByID);
router.put('/update/:id', Travel.update);
router.delete('/delete/:id', Travel.delete);

module.exports = router;