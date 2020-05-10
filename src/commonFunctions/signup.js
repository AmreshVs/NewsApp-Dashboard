import axios from 'axios';
import { API_URL } from '../constants/index';

const Signup = async (data) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/asignup',
    data: data
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default Signup;