import categoryApi from 'api/category';
import { useMutation, useQueryClient } from 'react-query';
import { TModifier } from 'types/Modifier';

const useUpdateModifier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, cateId, modifierId }: { data: TModifier; cateId: number; modifierId: number }) =>
      categoryApi.updateModifiersOfCategory(cateId!, modifierId, data),
    {
      onSuccess: (_, { cateId }) => {
        queryClient.invalidateQueries(['categories', cateId, 'modifiers']);
      }
    }
  );
};

export default useUpdateModifier;
