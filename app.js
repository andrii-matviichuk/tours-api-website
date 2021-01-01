const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// Define view engines (for rendering templates)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // to prevent bug when we forget / in path

// Serving static files automatically from public folder (e.x. pug)
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global middleware
//HTTP security header
app.use(helmet());

// Limit requests
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: 'Too many requests from this IP, try again in an hour!',
});
app.use('/api', limiter); // affect only routes which start from /api

// Body parser, data from req.body with limit of 10kb
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against Cross Site Scripting Attacks (XSS)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Mounting routers
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handling request to all routes which aren't specified
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  //when we pass the argument to the next() it automatically
  //skips all the middlewares and goes to error handling middleware
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
