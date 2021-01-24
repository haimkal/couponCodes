const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Coupon = require('../controllers/coupon')

router.put('/', Coupon.create);
router.get('/', Coupon.getAll);
router.get('/:id', Coupon.get );
router.post('/:id', Coupon.edit);
router.delete('/:id', Coupon.delete);
router.post('/:id/redeem', Coupon.redeem); 
router.get('/search/:code', Coupon.search)
module.exports = router;