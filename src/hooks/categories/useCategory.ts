import categoryApi from 'api/category';
import { useQuery } from 'react-query';

/** Get category detail */
const useCategory = (cateId: number) => {
  return useQuery(['categories', cateId], () => categoryApi.getById(cateId), {
    enabled: Boolean(cateId)
  });
};

export default useCategory;
