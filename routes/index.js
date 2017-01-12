var express = require('express');
var router = express.Router();
var Shipments = require('../models/shipments.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shipments', message: ''});
});

router.get('/allShipments', function (req, res, next) {
  Shipments.find({}, function(err, shipments) {
    if (!err){
        res.json(shipments);
    } else {throw err;}
});
});

router.post('/addShipment', function(req, res, next) {
  var qr = JSON.parse(req.body.qrCode);

  var orderNumber = req.body.orderNumber;
  var lot = qr.lot;
  var sku = qr.sku;
  var qty = req.body.qty ? req.body.qty : 0;

  var shipmentInfo = {
    orderNumber: orderNumber,
    sku: sku,
    lot: lot,
    qty: qty
  }

  Shipments.create(shipmentInfo, function (err, small) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('/');
});

module.exports = router;
