import axios from 'axios';
import { API_URL } from '../constants/index';

const PdfUpload = async (pdf, token) => {

  let formData = new FormData();
  formData.append("upload", pdf);
  
  return await axios.post(API_URL + '/pdf-upload', formData, {
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

export default PdfUpload;