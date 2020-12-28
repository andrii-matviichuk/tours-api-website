const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less than 40 characters'],
      minlength: [5, 'A tour name must have at least 5 characters'],
      // validate: [validator.isAlpha, 'The name should only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'The tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'The tour must have a duration'],
    },
    difficulty: {
      type: String,
      required: [true, 'The tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'The difficulty is either easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings average value must be above 1.0'],
      max: [5, 'Ratings average value must be less than or equal to 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 10,
    },
    priceDiscount: {
      type: Number,
      validate: {
        message: 'Discount price should be below regular price',
        validator: function (val) {
          // this points to the current document only when NEW document is CREATED
          return val < this.price;
        },
      },
    },
    summary: {
      type: String,
      trim: true, //removes all spaces in the beginning and at the end
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'The tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'The tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // Geo JSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  // this allows us to add virtual properties to the schema options
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
  // here this is pointing to the current document
  // what is not true in case of arrow function
});

// Document middleware. Which runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query middleware. Which runs before any find query is being executed
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides', // field which we want to populate with data from another document
    select: '-__v, -passwordChangedAt', // default select option
  });

  this.find({ secretTour: { $ne: true } });
  next();
});

//Aggregation middleware. Which runs before the aggregation() is executed
tourSchema.pre('aggregation', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $nte: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
