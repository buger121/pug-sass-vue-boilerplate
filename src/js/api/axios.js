/* global axios */
import { showLoading, hideLoading, showMessage } from '../base/common';

// 存储当前请求
const pendingMap = new Map();

// 维护loading
const LoadingInstance = {
  _count: 0,
};

function httpErrorStatusHandle(error) {
  if (axios.isCancel(error)) showMessage(`请求重复${error.message}`);
  if (error.message.includes('timeout')) showMessage('网络请求超时！');
  if (error.message.includes('Network')) showMessage('网络异常');
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options) {
  if (_options.loading && LoadingInstance._count > 0)
    LoadingInstance._count -= 1;
  if (LoadingInstance._count === 0) {
    hideLoading();
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  const { url, method, params, data } = config;
  //  if (typeof data === "string") data = JSON.parse(data);
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

function myAxios(axiosConfig, customOptions) {
  // 自定义配置
  const myCustomOptions = {
    platform: 'sdk', // 两种平台sdk和atp，默认为sdk
    repeat_request_cancel: true, // 是否开启取消重复请求，默认为true
    loading: true, // 是否开启loading效果，默认true
    err_msg_show: true, // 是否显示后台错误信息，默认true

    ...customOptions,
  };

  let baseURL;
  // 测试
  if (myCustomOptions.platform === 'sdk') {
    baseURL = 'https:// passportus-test.archosaur.com/';
  } else {
    baseURL = 'https:// atp-test.zulong.com:3443/';
  }
  // 正式
  //  myCustomOptions.platform === "sdk" ? (baseURL = "https:// passport-us.archosaur.com/") : (baseURL = "https:// atp-us.zloong.com");

  const service = axios.create({
    baseURL, //  设置统一的请求前缀
    timeout: 10000, //  设置统一的超时时长
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }, // axios默认为json格式
    transformRequest: [
      (data) => {
        let result = '';
        Object.entries(data).forEach(([key, val]) => {
          result += `${encodeURIComponent(key)}=${encodeURIComponent(val)}&`;
        });
        return result.slice(0, -1);
      },
    ],
  });

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config);
      if (myCustomOptions.repeat_request_cancel) addPending(config);
      // 创建loading
      if (myCustomOptions.loading) {
        LoadingInstance._count += 1;
        if (LoadingInstance._count === 1) {
          showLoading();
        }
      }
      // 给sdk所有接口加上固定appid参数
      if (myCustomOptions.platform === 'sdk') {
        if (config.method === 'post') {
          Object.assign(config.data, { appid: 'lzosandroid' });
        } else if (config.method === 'get') {
          config.params = { appid: 'lzosandroid' };
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 相应拦截
  service.interceptors.response.use(
    (response) => {
      removePending(response.config); // 删除重复请求
      if (myCustomOptions.loading) closeLoading(myCustomOptions); // 关闭loading
      if (response.data.retcode !== 0 && myCustomOptions.err_msg_show) {
        // retcode不为0，错误处理
        showMessage(response.data.retcode);
      }
      return response;
    },
    (error) => {
      if (error.config) removePending(error.config);
      if (myCustomOptions.loading) closeLoading(myCustomOptions); // 关闭loading
      httpErrorStatusHandle(error);
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
}

export default myAxios;
