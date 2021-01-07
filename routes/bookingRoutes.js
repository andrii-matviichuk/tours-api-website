const express = require('express');

const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const app = require('../app');

const router = express.Router();

router.use(viewsController.alerts);
router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getChekoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
