import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { UploadFileOutlined } from '@mui/icons-material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductImage } from 'types/product';
import { TTableColumn } from 'types/table';
import { CardTitle } from '../Card';
import { TextField, Avatar, IconButton, Radio, Stack } from '@mui/material';

interface Props {}

const ProductImagesForm = (props: Props) => {
  const { control } = useFormContext<CreateProductForm>();
  const {
    fields: productImages,
    append: appendProductImage,
    remove: removeProductImage
  } = useFieldArray({
    control,
    name: 'product_image'
  });

  const onUploadProductImg = async () => {
    const data: CreateProductForm['product_image'] = [
      {
        image_url:
          'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
        description: 'Product'
      },
      {
        image_url:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80',
        description: 'Product'
      }
    ];
    appendProductImage(data);
  };

  const productImgColumns: TTableColumn<ProductImage>[] = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      render: (_: any, data) => {
        return <Avatar variant="square" sx={{ width: 54, height: 54 }} src={data.image_url} />;
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (_, data, idx) => (
        <Controller
          control={control}
          name={`product_image.${idx}.description`}
          render={({ field }) => (
            <TextField
              key={`${data.image_url}-${productImages[idx]?.id}`}
              label="Mô tả"
              {...field}
            />
          )}
        />
      )
    },
    {
      title: 'Ảnh đại diện',
      render: (_: any, data, idx) => {
        return (
          <Controller
            control={control}
            name={`pic_url`}
            render={({ field }) => (
              <Radio
                key={`${data.image_url}`}
                value={data.image_url}
                onChange={() => {
                  field.onChange(data.image_url);
                }}
                checked={data.image_url === field.value}
              />
            )}
          />
        );
      }
    },
    {
      title: '',
      render: (_, __, idx) => (
        <IconButton onClick={() => removeProductImage(idx)} sx={{ color: 'red' }} size="large">
          <Icon icon={trashIcon} />
        </IconButton>
      )
    }
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardTitle mb={2} variant="subtitle1">
          Hình ảnh
        </CardTitle>
        <LoadingAsyncButton
          onClick={onUploadProductImg}
          size="small"
          variant="outlined"
          startIcon={<UploadFileOutlined />}
        >
          Thêm ảnh
        </LoadingAsyncButton>
      </Stack>
      <ResoTable
        showFilter={false}
        pagination={false}
        showSettings={false}
        showAction={false}
        columns={productImgColumns}
        rowKey="description"
        dataSource={productImages}
      />
    </>
  );
};

export default ProductImagesForm;
