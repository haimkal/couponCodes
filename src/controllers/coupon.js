
const {db} = require('../db.js');
const {ObjectId } = require('mongodb');
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
        });
    }

    

}

module.exports = Coupon;
