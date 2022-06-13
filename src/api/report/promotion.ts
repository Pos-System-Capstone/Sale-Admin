import { TPromotionBase } from 'types/report/promotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;
console.log(request);

const getPromotion = (params?: any) =>
  request.get<BaseReponse<TPromotionBase>>(`/promotion-report/13`);

const promotionApi = { getPromotion };

export default promotionApi;
