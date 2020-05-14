import axios from 'axios';
import { API_URL } from '../../constants/index';

const DeleteVideo = async (id, token) => {  
  return await axios({
    method: 'GET',
    url: API_URL + '/delete-video?id=' + id,
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

export default DeleteVideo;