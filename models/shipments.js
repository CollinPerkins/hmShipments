var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shipmentsSchema = new Schema({
    orderNumber: String,
    sku: String,
    lot: String,
    qty: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipment', shipmentsSchema);
