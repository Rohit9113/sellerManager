const mongoose = require('mongoose');

const storeInfoSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  timings: {
    type: String,
    required: true,
  },
});

const StoreInfo = mongoose.model('StoreInfo', storeInfoSchema);

module.exports = StoreInfo;
