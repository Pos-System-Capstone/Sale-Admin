import categoryApi from 'api/category';
import extraApi from 'api/extra';
import { useMutation, useQueryClient } from 'react-query';
import { TModifier } from 'types/Modifier';

const useUpdateExtra = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, categoryExtraId }: { data: any; categoryExtraId: number }) =>
      extraApi.update(categoryExtraId!, data),
    {
      onSuccess: (_) => {
        // queryClient.invalidateQueries(['categories', cateId, 'extras']);
      }
    }
  );
};

export default useUpdateExtra;
