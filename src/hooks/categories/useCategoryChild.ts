import categoryApi from 'api/category';

const getCategoryChilds = (cateId?: number) => {
  return categoryApi.getChildByCategoriId(cateId!).then((res) => res.data);
};

export default getCategoryChilds;
