
const {db} = require('../db.js');
const {ObjectId } = require('mongodb');
const { report } = require('../middlewares/couponroutes.js');
class Coupon {

    static create(req, res) {
        const coupon = {
            code: req.body.code ? req.body.code : Math.random().toString(36).substring(7).toUpperCase(),
            date: Date.now(),
            isRedeem: false
        }
        db().collection('coupons')
            .insertOne(coupon)
            .then((report) => {
                res.status(201).send(report.ops[0]);
            })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    }

    static getAll(req, res) {
        db().collection('coupons')
            .find()
            .toArray()
            .then((coupons) => {
                res.send(coupons);
                })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    }

    static get  (req,res){
        db().collection('coupons')
        .findOne({_id: ObjectId(req.params.id)})
        .then(coupon => {
            if (!coupon) {
                res.sendStatus(404);
                return;
            }
            res.send(coupon);
            })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
    }

    
    static edit (req, res) {
	db().collection('coupons')
	.updateOne(
		{_id: ObjectId(req.params.id)},
		{$set: req.body}
		)
		.then((report)=> {
			if(report.matchedCount === 0){
				res.sendStatus(404);
				return;
			}
			res.status(200).send('coupon has been edited');    
            })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
            });
    }
    
    static delete (req, res){
        db().collection('coupons')
		.deleteOne({_id: ObjectId(req.params.id)})
		.then((report)=> {
			if(report.deletedCount === 0){
				res.sendStatus(404); 
				return;
			}
			res.sendStatus(204);
            })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
            });
    }

    static redeem (req, res){
        db().collection('coupons')
        .updateOne(	
            {_id: ObjectId(req.params.id)},
            {$set: {isRedeem: true} }
                    )
        .then ((report)=>{
            if(report.modifiedCount ===0){
                res.status(400).send('The coupon has been already redeemed');
                return;
            }
            res.status(200).send('The coupon has been redeemed');
            })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
            });
    }

    static search (req,res) {
        db().collection('coupons')
        .findOne({code: req.params.code})
        .then(code => {
            if (!code) {
                res.status(400).send("this coupon code doesn't exist");
                return;
            }
            res.status(200).send(`coupon code ${req.params.code} exists` );
            })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
            });
    }

        



}   

module.exports = Coupon;
