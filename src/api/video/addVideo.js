import axios from 'axios';
import { API_URL } from '../../constants/index';

const AddVideo = async (data, token) => {  
  return await axios({
    method: 'POST',
    url: API_URL + '/add-video',
    headers: {
      'Authorization': token
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

export default AddVideo;