import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export type TConditionBase = {
  conditionRuleId?: any;
  brandId?: any;
  ruleName?: any;
  description?: any;
  conditionGroups: [
    {
      conditionGroupId?: any;
      conditionRuleId?: any;
      groupNo?: any;
      nextOperator?: any;
      conditions: [
        {
          orderConditionId?: any;
          conditionGroupId?: any;
          nextOperator?: any;
          indexGroup?: any;
          quantity?: any;
          quantityOperator?: any;
          amount?: any;
          amountOperator?: any;
          delFlg?: any;
          insDate?: any;
          updDate?: any;
        }
      ];
      summary?: any;
    }
  ];
  promotionId?: any;
  promotionName?: any;
  insDate?: any;
  updDate?: any;
};

const getConditionRules = (params?: any) =>
  request.get<BaseReponse<TConditionBase>>(`/condition-rules`, { params });

const conditionApi = { getConditionRules };

export default conditionApi;
