const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    default: 10,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
