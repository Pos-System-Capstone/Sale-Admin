import categoryApi from 'api/category';
import { useQuery } from 'react-query';
/** Get list root categories */
const useCategories = (params?: any) => {
  return useQuery(['categories', params], () => categoryApi.get(params), {
    select: (res) => res.data.data
  });
};

export default useCategories;
