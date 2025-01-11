import axios from 'axios';
import { baseUrl } from './config';
import { hideLoader } from '../../utils/loader';


export const httpPost = async (url, postBody, otherUrl, isNotAuth) => {
   
    try {
      const res = await axios.post(
        `${baseUrl}${url}`,
        postBody,          
      );
      return res.data;
    } catch (err) {
      hideLoader();
      if (err.response.data.error === 'Internal Server Error') {
        return {
          status: false,
          message: err.response.data.error,
        };
      }
      if (err.response.data.message === 'Validation Errors') {
        // Object.values(err.response.data.data).map((item) =>
        //   error(item, 'Oops!', 5000)
        // );
        return {
          status: false,
          message: err.response?.data.data[0],
        };
      }
      return err.response?.data;
    }
  };


  export const httpPut = async (url, postBody, otherUrl) => {
   
    try {
      const res = await axios.put(
        `${baseUrl}${url}`,
        postBody,
      );
      // console.log(res);
      return res.data;
    } catch (err) {
      hideLoader();
      if (err.response.data.message === 'Validation Errors') {
        return {
          status: false,
          message: err.response?.data.data[0],
        };
      }
      return err.response?.data;
    }
  };

  export const httpPostFormData = async (url, postBody) => {
   
    try {
      const res = await axios.post(
        `${baseUrl}${url}`,
        postBody,
        {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }
          
      );
      // console.log(res);
      return res.data;
    } catch (err) {
      hideLoader();
      return err.response?.data;
    }
  };

  export const httpGet = async (url, otherUrl, isNotAuth) => {
    
    try {
      const res = await axios.get(
        `${baseUrl}${url}`         
      );
      // console.log(res);
      return res.data;
    } catch (err) {
      hideLoader();
      if (err?.response?.data?.message === 'Validation Errors') {
        Object.values(err?.response?.data?.data).map((item) => err(item));
        return {
          status: false,
          message: err?.response?.data.data[0],
        };
      }
      if (err.response.data.error === 'Unauthorized') {
        return {
          status: false,
          message: err.response.data.error,
        };
      }
      return err?.response?.data;
    }
  };