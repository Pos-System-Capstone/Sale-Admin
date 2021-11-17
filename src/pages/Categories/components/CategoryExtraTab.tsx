import { TextField, Box, Stack, Typography, Card } from '@mui/material';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import { FormProvider, useForm } from 'react-hook-form';
import { TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';

interface Props {}

const CategoryExtraTab = (props: Props) => {
  const categoryExtraForm = useForm();

  const prodExtraData = [
    {
      id: 1,
      categoryName: 'Pizza Extra',
      products: [
        {
          product_name: 'Pizza Extra 1',
          code: 'PZE1',
          price: 20000
        },
        {
          product_name: 'Pizza Extra 2',
          code: 'PZE2',
          price: 5000
        }
      ] as TProductBase[]
    },
    {
      id: 1,
      categoryName: 'Topping Extra',
      products: [
        {
          product_name: 'Topping Extra 1',
          code: 'TZE1',
          price: 7000
        },
        {
          product_name: 'Topping Extra 2',
          code: 'TZE2',
          price: 2000
        }
      ] as TProductBase[]
    }
  ];

  const productExtraColumns: TTableColumn<TProductBase>[] = [
    {
      title: 'Tên',
      dataIndex: 'product_name'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      render: (value, __) => <TextField value={value} label="Mã sản phẩm" disabled />
    },

    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value, __) => <TextField value={value} label="Giá" disabled />
    }
  ];

  return (
    <Card>
      <FormProvider {...categoryExtraForm}>
        {prodExtraData.map((categoryExtra, idx) => (
          <Box key={`extra-product-group-${categoryExtra.id}`}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Label color="default">{idx + 1}</Label>
              <Typography variant="h6">{categoryExtra.categoryName}</Typography>
            </Stack>
            <ResoTable
              showFilter={false}
              pagination={false}
              showSettings={false}
              showAction={false}
              columns={productExtraColumns}
              rowKey="description"
              dataSource={categoryExtra.products}
            />
          </Box>
        ))}
      </FormProvider>
    </Card>
  );
};

export default CategoryExtraTab;
