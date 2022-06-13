import axios from 'axios';

export const getAllPromotion = (params: any = {}) =>
  axios.get('https://stg-report-api.reso.vn/api/v1/promotion-report', { params });
