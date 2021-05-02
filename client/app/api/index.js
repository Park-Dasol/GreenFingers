import axios from 'axios';
import {Alert} from 'react-native';
import {ACCESS_TOKEN, API_BASE_URL} from '../config/config';

// 토큰 있는 axios 인스턴스(엑세스토큰 수정 필요)
export const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
});

// 백엔드에 요청 보낼 때, 인터셉터로 토큰 담기!
instance.interceptors.request.use(
  async function (config) {
    const token = await ACCESS_TOKEN();
    config.headers.TOKEN = token;
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  },
);

// interceptors(임시. 백엔드와 협의 필요)
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status == '401') {
      Alert.alert(
        '주의⚠',
        '로그인이 만료되었습니다. 다시 로그인 해주세요.(Error Code: 401)',
      );
    } else if (error.response.status == '403') {
      Alert.alert('주의⚠', '권한이 없습니다.(Error Code: 403)');
    } else if (error.response.status == '400') {
      Alert.alert('주의⚠', '클라이언트 오류(Error Code: 400)');
    } else if (error.response.status == '404') {
      Alert.alert('주의⚠', 'Not Found(Error Code: 404)');
    } else {
      Alert.alert('주의⚠', '오류 발생');
    }
    return Promise.reject(error);
  },
);
