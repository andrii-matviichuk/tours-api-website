import axios from 'axios';
import { showAlert } from './alert';

exports.updateData = async (data, type, host) => {
  try {
    const updateType = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      method: 'PATCH',
      url: `${host}/api/v1/users/${updateType}`,
      data,
    });
    if (res.data.status === 'success' || res.data.message === 'success') {
      showAlert('success', 'Updated!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
