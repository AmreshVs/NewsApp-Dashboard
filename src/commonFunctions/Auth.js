import axios from 'axios';
import { API_URL } from '../constants/index';

const Auth = async (data) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/alogin',
    data: data
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default Auth;