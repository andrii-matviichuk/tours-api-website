import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';
import { displayMap } from './mapbox';

const mapBox = document.getElementById('map');
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
    login(email, password);
  });
}

if (updateDataForm) {
  updateDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    await updateData({ name, email });
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
    await updateData(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    updatePasswordBtn.textContent = 'Save password';
    updatePasswordBtn.disabled = false;

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
