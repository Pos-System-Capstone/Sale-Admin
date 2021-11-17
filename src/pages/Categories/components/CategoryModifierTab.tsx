import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Button, Typography } from '@mui/material';
import CategoryModifierForm from 'components/form/CategoryModifier/CategoryModifierForm';
import ModalForm from 'components/ModalForm/ModalForm';
import ResoTable from 'components/ResoTable/ResoTable';
import useAddModifier from 'hooks/categories/useAddModifier';
import useCategoryModifiers from 'hooks/categories/useCategoryModifers';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  ModifierForm,
  ModifierSelectType,
  modifierSelectTypeOptions,
  TModifier
} from 'types/Modifier';
import { TTableColumn } from 'types/table';
import * as yup from 'yup';
import { normalizeModifier, transformModifier } from '../helper';
interface Props {}

const schema = yup.object({
  title: yup.string().required('Vui lòng nhập tên tuỳ chỉnh'),
  select_type: yup.mixed().oneOf(Object.values(ModifierSelectType), 'Vui lòng chọn kiểu'),
  modifiers: yup
    .array()
    .min(1, 'Vui lòng có ít nhất một giá trị')
    .of(
      yup.object().shape({
        label: yup.string().required('Vui lòng nhập tên gía trị'),
        value: yup.string().required('Vui lòng nhập gía trị')
      })
    )
});

const CategoryModifierTab = (props: Props) => {
  const { id } = useParams();
  const createModifierForm = useForm<ModifierForm>({
    resolver: yupResolver(schema)
  });
  const { enqueueSnackbar } = useSnackbar();

  const { data: modifiers } = useCategoryModifiers(Number(id));
  const { mutateAsync: addModifierAsync } = useAddModifier();

  const [editModifier, setEditModifier] = useState<TModifier | null>(null);

  const modifierColumns: TTableColumn<TModifier>[] = [
    {
      title: 'Tên',
      dataIndex: 'title'
    },
    {
      title: 'Type',
      dataIndex: 'select_type',
      valueType: 'select',
      valueEnum: modifierSelectTypeOptions
    },
    {
      title: 'Giá trị',
      dataIndex: 'json_value',
      render: (_, data) => {
        const values = normalizeModifier(data).modifiers?.map((m) => m.label);
        return <Typography>{values?.join(',') ?? 'N/A'}</Typography>;
      }
    }
  ];

  const onAddModifier = async (values: ModifierForm) => {
    try {
      const data = transformModifier({ ...values, cate_id: Number(id) });
      await addModifierAsync({ data, cateId: Number(id) });
      return true;
    } catch (error) {
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
    return false;
  };

  return (
    <Card>
      <ModalForm
        onOk={async () => {
          try {
            await createModifierForm.handleSubmit(onAddModifier, (e) => {
              console.log(`e`, e);
              throw e;
            })();
            console.log(`success`);
            return true;
          } catch (error) {
            return false;
          }
        }}
        title={<Typography variant="h3">Thêm tuỳ chỉnh</Typography>}
        trigger={<Button variant="contained">Thêm tuỳ chỉnh</Button>}
      >
        <FormProvider {...createModifierForm}>
          <CategoryModifierForm />
        </FormProvider>
      </ModalForm>
      <Box py={2}>
        <ResoTable
          showFilter={false}
          pagination={false}
          showSettings={false}
          columns={modifierColumns}
          rowKey="description"
          dataSource={modifiers ?? []}
          onEdit={setEditModifier}
        />
      </Box>
    </Card>
  );
};

export default CategoryModifierTab;
