import axios, { AxiosRequestConfig } from 'axios';

// Custom Axios Type
export enum AxiosClientFactoryEnum {
  REPORT = 'report',
  SALE = 'sale'
}

// ----------------------------------------------------------------------

const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  paramsSerializer: parseParams
});

request.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

// ----------------------------------------------------------------------
class AxiosClientFactory {
  /**
   * Use to get instance of AxiosClientFactory
   * @param type AxiosClientFactoryEnum
   * @param config AxiosRequestConfig
   * @returns AxiosInstance
   *
   * @example
   * ```javascript
   *
   * // Get the Axios Instance
   * import {axiosClientFactory} from 'utils/axios';
   * var axiosInstance = axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE);
   *
   *
   * ```
   *
   */
  getAxiosClient(type?: AxiosClientFactoryEnum, config: AxiosRequestConfig = {}) {
    const requestReport = { ...request };
    switch (type) {
      case 'report':
        requestReport.defaults = {
          ...config,
          // TODO: Change this baseurl
          baseURL: process.env.REACT_APP_REPORT_BASE_URL
        };
        return requestReport;
      case 'sale':
        requestReport.defaults = {
          ...config,
          baseURL: process.env.REACT_APP_REPORT_BASE_URL
        };
        return requestReport;
      default:
        return requestReport;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();

export { axiosClientFactory };

export default axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE);
