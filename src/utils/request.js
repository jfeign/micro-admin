/**
 * 初始化 axios 实例
 *
 * 设置 ajax 请求的一些默认行为
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MessageBox, Notification, Loading } from 'element-ui';
import permission from './permission';
import config from '@/config';
import generateMock from './mock';
import api from '@/resources/api';
import store from '@/store';

// https://github.com/axios/axios#cancellation
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 创建axios实例
const request = axios.create({
  baseURL: 'http://10.20.69.167:8080/api', // api的base_url
  timeout: 10000, // 请求超时时间 ms
  cancelToken: source.token,
});




// request 拦截器，在每个请求之前执行
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

// response 拦截器，在每个请求返回之后执行
request.interceptors.response.use(
  response => {
    let success
    if (response.data.code === '200') {
      success = true
    } else {
      success = false
    }
    
    return {success, ...response.data};
  },
  error => {
    console.error(error);
    Notification.error({
      title: '错误',
      message: error.message || '请求错误',
      duration: 10000,
    });
    return Promise.reject(error);
  }
);

// mock
if (config.mockEnabled) {
  let mock = new MockAdapter(request, {
    delayResponse: 500, // 模拟延迟响应
  });
  generateMock(mock);
}

export default request;
