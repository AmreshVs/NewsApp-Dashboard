import axios from 'axios';
import { API_URL } from '../../constants/index';

const AddNotification = async (data, token) => {  
  return await axios({
    method: 'POST',
    url: API_URL + '/add-notification',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: data
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default AddNotification;