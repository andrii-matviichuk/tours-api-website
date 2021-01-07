import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';
import { displayMap } from './mapbox';
import { bookTour } from './stripe';
import { showAlert } from './alert';

const mapBox = document.getElementById('map');
const bookTourBtn = document.getElementById('book-tour');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const updatePasswordBtn = document.querySelector('.btn--save-password');

if (mapBox) {
  const dataset = JSON.parse(mapBox.dataset.locations);
  displayMap(dataset);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const host = window.location.protocol + '//' + window.location.host;
    login(email, password, host);
  });
}

if (updateDataForm) {
  updateDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    const photo = document.getElementById('photo').files[0];
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', photo);
    const host = window.location.protocol + '//' + window.location.host;
    await updateData(form, 'data', host);
    if (photo) location.reload();
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    updatePasswordBtn.textContent = 'Updating...';
    updatePasswordBtn.disabled = true;
    const host = window.location.protocol + '//' + window.location.host;
    await updateData(
      { passwordCurrent, password, passwordConfirm },
      'password',
      host
    );
    updatePasswordBtn.textContent = 'Save password';
    updatePasswordBtn.disabled = false;

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', () =>
    logout(window.location.protocol + '//' + window.location.host)
  );
}

if (bookTourBtn) {
  bookTourBtn.addEventListener('click', async (e) => {
    const { tourId } = e.target.dataset;
    const host = window.location.protocol + '//' + window.location.host;
    bookTourBtn.textContent = 'Processing...';
    await bookTour(tourId, host);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
