import storeApi from 'api/report/store';
import { useQuery } from 'react-query';
/** Get list root categories */
const useStore = (params?: any) => {
  return useQuery(['trading', params], () => storeApi.get({ params }).then((res) => res.data), {
    refetchOnWindowFocus: false
  });
};

export default useStore;