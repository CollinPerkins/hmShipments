var express = require('express');
var router = express.Router();
var Shipments = require('../models/shipments.js');
var csv = require('csv-parse');

router.post('/trackingUpload', function (req, res, next) {

  // newBody = newBody.slice(3, -5);
  // console.log(newBody);
  // csv(newBody, function(err, data){
  //   console.log(data);
  // });

  for (var i = 0; i < req.body.length; i++) {
    Shipments.find({orderNumber: req.body[i].orderNumber}, function (err, orders) {
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];

        order.tracking = req.body[i].tracking;
        console.log(order);

        // order.save(function (err) {
        //     if(err) {
        //         console.error('ERROR!');
        //     }
        // });
      }
    });
  }

  // fs.createReadStream(file.path).pipe(csv()).on('data', function(data){
  //
  //
  // })
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
