import axios from 'axios';
import { API_URL } from '../../constants/index';

const NewPost = async (data, token) => {  
  return await axios({
    method: 'POST',
    url: API_URL + '/new-post',
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

export default NewPost;