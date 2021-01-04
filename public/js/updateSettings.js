import axios from 'axios';
import { showAlert } from './alert';

exports.updateData = async (data, type) => {
  try {
    const updateType = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${updateType}`,
      data,
    });
    if (res.data.status === 'success' || res.data.message === 'success') {
      showAlert('success', 'Updated!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
