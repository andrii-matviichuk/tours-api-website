const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newTourId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.status(404).send(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updatedTour', //TODO: updated tour
    },
  });
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
