import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password, host) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${host}/api/v1/users/login`,
      data: {
        email,
        password,
      },
    });

    if (res.data.message === 'success') {
      showAlert('success', 'Succefully logged in!');
      window.setTimeout(() => {
        location.assign('/');
      }, 700);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async (host) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${host}/api/v1/users/logout`,
    });
    if (res.data.status === 'success') {
      location.reload();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
