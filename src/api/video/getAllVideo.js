import axios from 'axios';
import { API_URL } from '../../constants/index';

const GetAllVideo = async (page, size, token) => {  
  return await axios({
    method: 'GET',
    url: `${API_URL}/get-all-video?page=${page}&size=${size}`,
    headers: {
      'Authorization': token,
    },
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default GetAllVideo;