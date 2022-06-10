import axios from 'axios';

export const getAllTrading = (params: any = {}) =>
  axios.get('https://stg-report-api.reso.vn/api/v1/system-report', { params });
