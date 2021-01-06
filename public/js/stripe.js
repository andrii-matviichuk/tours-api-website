import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51I6HQ9EcpnjS8OMUSluPM6cEMEsH7H6FC9pGRvWRvQEETQQmr9TewxuqX2vPglHAxacxrdmFgTSb3f95AqPEgbA700qBPZoVZP'
);

export const bookTour = async (tourId, host) => {
  try {
    const session = await axios(
      `${host}/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
