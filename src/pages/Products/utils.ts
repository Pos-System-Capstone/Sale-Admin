import { ProductTypeEnum } from 'types/product';
import { getCbn } from 'utils/utils';
import { UpdateProductForm } from './type';

export const transformProductForm = (values: UpdateProductForm) => {
  const transformData = { ...values };
  transformData.atts = values.variants.map(({ optName }) => optName);
  if (transformData.product_type) {
    const variantArr = values.variants?.reduce<any>((acc, { values = [] }) => [...acc, values], []);
    transformData.child_products = getCbn(...variantArr)?.map((arr) => ({
      atts: arr,
      is_available: true,
      code: `${transformData.code}${arr.join('')}`,
      product_name: `${transformData.product_name}-${arr.join('-')}`
    }));
  }
  return transformData;
};
