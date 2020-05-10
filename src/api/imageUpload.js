import axios from 'axios';
import { API_URL } from '../constants/index';

const ImageUpload = async (image, token) => {

  let formData = new FormData();
  formData.append("upload", image);
  
  return await axios.post(API_URL + '/image-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    }
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
}

export default ImageUpload;