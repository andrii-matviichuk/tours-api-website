const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

//Routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
