const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Coupon = require('../controllers/coupon')

router.put('/', Coupon.create);
router.get('/', Coupon.getAll);
router.get('/:id', Coupon.get )


module.exports = router;