var express = require('express');
var router = express.Router();
var Shipments = require('../models/shipments.js');
var csv = require('csv-parse');

router.post('/trackingUpload', function (req, res, next) {

  var newBody = req.body;

  newBody.forEach(function(obj) {
    Shipments.find({orderNumber: obj.orderNumber}, function (err, orders) {
      console.log("Orders " + orders);
      console.log("tracking " + obj.tracking);
      for (var j = 0; j < orders.length; j++) {
        var order = orders[j];
        order.tracking = obj.tracking;
        console.log("Single Order " + order);
        console.log("Single tracking " + obj.tracking);

        // order.save(function (err) {
        //     if(err) {
        //         console.error('ERROR!');
        //     }
        // })
      }
    });
  });
  // for (var i = 0; i < newBody.length; i++) {

  // }
  res.send('done');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shipments', message: ''});
});

router.get('/allShipments', function (req, res, next) {
  Shipments.find({}, function(err, shipments) {
    if (!err){
      console.log(shipments);
      res.json(shipments);
    } else {throw err;}
});
});

router.post('/addShipment', function(req, res, next) {
  var qr = JSON.parse(req.body.qrCode);

  var orderNumber = req.body.orderNumber;
  var serial = qr.lot;
  var sku = qr.sku;
  var qty = req.body.qty ? req.body.qty : 0;

  var shipmentInfo = {
    orderNumber: orderNumber,
    sku: sku,
    serial: serial,
    qty: qty
  }

  Shipments.create(shipmentInfo, function (err, small) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('/');
});

module.exports = router;
