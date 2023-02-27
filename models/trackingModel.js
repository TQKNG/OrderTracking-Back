// const mongoose = require('mongoose');

// const trackingSchema = mongoose.Schema({
//     orderNumber:String,
//     trackingStatus:String,
//     note: String,
//     orderDate: Date,
//     pickingDate: Date,
// })

// const Tracking = mongoose.model('TrackingData',trackingSchema);

// module.exports = Tracking;

const mongoose = require('mongoose');

const trackingSchema = mongoose.Schema({
    orderNumber:String,
    trackingStatus:String,
    note: String,
    orderDate: Date,
    pickingDate: Date,
})

const Tracking = mongoose.model('TrackingData',trackingSchema);

module.exports = Tracking;

