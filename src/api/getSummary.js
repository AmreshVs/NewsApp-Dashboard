import axios from 'axios';
import { API_URL } from '../constants/index';

const GetSummary = async (token) => {  
  return await axios({
    method: 'GET',
    url: API_URL + '/summary',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default GetSummary;