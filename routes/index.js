var express = require('express');
var router = express.Router();
var Shipments = require('../models/shipments.js');
var multer  = require('multer');
var upload = multer({dest: 'uploads/'});
var csv = require('csv-parse');
var fs = require('fs');

router.post('/trackingUpload', upload.single(''), function (req, res, next) {
  // var file = req.file;
  var newBody = JSON.stringify(req.body);
  console.log(newBody);
  newBody = newBody.slice(2, -5);
  console.log(newBody);
  parse(newBody, {comment: '#'}, function(err, output){
    console.log(data);
  });

  // fs.createReadStream(file.path).pipe(csv()).on('data', function(data){
  //   Shipments.find({orderNumber: data[0]}, function (err, orders) {
  //     for (var i = 0; i < orders.length; i++) {
  //       var order = orders[i];
  //
  //       order.tracking = data[3];
  //       console.log(order);
  //
  //       order.save(function (err) {
  //           if(err) {
  //               console.error('ERROR!');
  //           }
  //       });
  //     }
  //   });
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
