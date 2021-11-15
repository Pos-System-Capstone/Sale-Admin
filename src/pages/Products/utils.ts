import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { TProductMaster } from 'types/product';
import { getCbn } from 'utils/utils';
import { UpdateProductForm } from './type';

export const transformProductForm = (values: UpdateProductForm) => {
  const transformData = { ...values };
  transformData.atts = values.variants?.map(({ optName }) => optName);
  if (transformData.product_type) {
    const variantArr = values.variants?.reduce<any>((acc, { values = [] }) => [...acc, values], []);
    // transformData.child_products = getCbn(...variantArr)?.map((arr) => ({
    //   atts: arr,
    //   is_available: true,
    //   code: `${transformData.code}${arr.join('')}`,
    //   product_name: `${transformData.product_name}-${arr.join('-')}`
    // }));
  }
  return transformData;
};

export const normalizeProduct = (values: UpdateProductForm) => {
  const data = { ...values };
  if (data.description) {
    data.description = draftToHtml(
      convertToRaw((data.description as any as EditorState).getCurrentContent())
    );
  }

  return data;
};

export const transformProductData = (values: TProductMaster) => {
  const transformData: Partial<UpdateProductForm> = { ...values };
  transformData.variants =
    transformData.atts?.map((att) => ({
      optName: att,
      values: []
    })) ?? [];

  // transformData
  transformData.child_products?.forEach((childProd) => {
    if (childProd?.atts) {
      for (let index = 0; index < childProd?.atts?.length; index++) {
        const att = childProd.atts[index];
        const opt = transformData?.variants && transformData?.variants[index];
        if (!opt?.values.includes(att) && opt?.values) {
          opt.values.push(att);
        }
      }
    }
  });
  const html = transformData.description;
  const contentBlock = htmlToDraft(html ?? '');
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    transformData.description = editorState as any as string;
  }

  console.log(`transformData`, transformData);
  return transformData;
};
