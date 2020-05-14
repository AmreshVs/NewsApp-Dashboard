import axios from 'axios';
import { API_URL } from '../../constants/index';

const GetPost = async (id, token) => {  
  return await axios({
    method: 'GET',
    url: API_URL + '/get-post?id=' + id,
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

export default GetPost;