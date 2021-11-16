import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { AddOutlined, Info, UploadFileOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Radio,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { DraftEditor } from 'components/editor';
import { AutoCompleteField, CheckBoxField, DraftEditorField, InputField } from 'components/form';
import SeoForm from 'components/form/Seo/SeoForm';
import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import useCategories from 'hooks/categories/useCategories';
import React, { useMemo, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TCategory } from 'types/category';
import { CreateProductForm, ProductImage, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import VariantForm from '../VariantForm';
import AddCategoryModal from './AddCategoryModal';
import { Card, CardTitle } from './Card';

type Props = {
  updateMode?: boolean;
};

// TODO: Disable nhung category cha da co san pham => Khong cho chon category con
// TODO: Tao `CreateProduct` type
// TODO: Them rule cho form

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { data: categories } = useCategories();

  const categoryTreeData = useMemo<RenderTree[]>(() => {
    const generateTree: any = (category: TCategory) => {
      if (!category.childs || category.childs.length === 0) {
        return {
          id: category.cate_id,
          name: category.cate_name,
          children: []
        };
      }
      return {
        id: category.cate_id,
        name: category.cate_name,
        children: category.childs.map(generateTree)
      };
    };

    return (
      categories?.map((c) => ({
        id: `${c.cate_id}`,
        name: c.cate_name,
        children: c?.childs.map(generateTree)
      })) ?? []
    );
  }, [categories]);

  const { control, watch } = useFormContext<CreateProductForm>();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  // const {
  //   fields: modifiers,
  //   append: appendModifier,
  //   remove: removeModifier
  // } = useFieldArray({
  //   control,
  //   name: 'modifires'
  // });

  const {
    fields: productImages,
    append: appendProductImage,
    remove: removeProductImage
  } = useFieldArray({
    control,
    name: 'product_image'
  });

  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);

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
      title: 'Miêu tả',
      dataIndex: 'description',
      render: (_, data, idx) => (
        <Controller
          control={control}
          name={`product_image.${idx}.description`}
          render={({ field }) => (
            <TextField
              key={`${data.image_url}-${productImages[idx]?.id}`}
              label="Miêu tả"
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

  return (
    <Box>
      <AddCategoryModal
        maxWidth="sm"
        fullWidth
        open={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onFinish={async (values) => {
          console.log(`values`, values);
          setShowAddCategoryModal(false);
        }}
      />
      <Stack p={1} spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin sản phẩm
            </CardTitle>
            <CheckBoxField name="is_available" label="Hiển thị trên web" />
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField
                    fullWidth
                    name="product_name"
                    label="Tên sản phẩm"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField fullWidth name="code" label="Mã sản phẩm" required size="small" />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    fullWidth
                    type="number"
                    name="price"
                    label="Giá sản phẩm"
                    required
                    size="small"
                    helperText="Giá áp dụng khi không được cấu hình trong menu"
                  />
                </Grid>
                <Grid item xs={6}>
                  <AutoCompleteField
                    name="tags"
                    label="Tag"
                    multiple
                    freeSolo
                    size="small"
                    variant="outlined"
                    options={[]}
                    limitTags={2}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography my={2} variant="subtitle2">
                  Phân mục sản phẩm
                </Typography>
                <Button onClick={() => setShowAddCategoryModal(true)}>Thêm phân mục</Button>
              </Stack>
            </Box>
            <Controller
              name="cat_id"
              render={({ field }) => <TreeViewField data={categoryTreeData} {...field} />}
            />
          </Stack>
        </Card>

        <Card>
          <CardTitle mb={2} variant="subtitle1">
            Miêu tả
          </CardTitle>
          <Controller
            name="description"
            render={({ field }) => (
              <DraftEditorField value={field.value} onChange={field.onChange} />
            )}
          />
        </Card>

        <Card>
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
        </Card>

        <Card>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1}>
              <CardTitle variant="subtitle1">Extra</CardTitle>
              <Tooltip
                title="Các nhóm sản phẩm extra phụ thuộc vào phân mục sản phẩm"
                placement="right"
                arrow
              >
                <Info />
              </Tooltip>
            </Stack>
            <Button size="small" variant="outlined" startIcon={<AddOutlined />}>
              Thêm nhóm sản phẩm extra
            </Button>
          </Stack>
          <CheckBoxField name="has_extra" label="Sản phẩm có extra" />
          {hasExtra &&
            prodExtraData.map((categoryExtra, idx) => (
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
        </Card>

        {/* <Card>
          <Stack direction="row" spacing={1}>
            <CardTitle variant="subtitle1">Tuỳ chỉnh cho sản phẩm</CardTitle>
            <Tooltip
              title="Các tuỳ chỉnh cho sản phẩm phụ thuộc vào phân mục sản phẩm"
              placement="right"
              arrow
            >
              <Info />
            </Tooltip>
          </Stack>
          {modifiers.map((modifier, optIndex) => (
            <Box key={`variant-${modifier.id}`}>
              <Stack direction="row" spacing={2}>
                <InputField
                  name={`modifiers.${optIndex}.modifierName`}
                  size="small"
                  label="Tên tùy chỉnh"
                />
                <SelectField
                  options={[
                    {
                      label: 'Single choice',
                      value: 'single-choice'
                    },
                    {
                      label: 'Multiple',
                      value: 'multiple'
                    }
                  ]}
                  name={`modifiers.${optIndex}.selectType`}
                  size="small"
                  label="Kiểu"
                  sx={{ width: '150px' }}
                />
                <Box flex={1}>
                  <AutoCompleteField
                    name={`modifiers.${optIndex}.values`}
                    label="Giá trị"
                    multiple
                    freeSolo
                    size="small"
                    variant="outlined"
                    options={[]}
                    limitTags={2}
                    fullWidth
                  />
                </Box>
                <IconButton onClick={() => removeModifier(optIndex)} sx={{ color: 'red' }}>
                  <Icon icon={trashIcon} />
                </IconButton>
              </Stack>
            </Box>
          ))}
          <Divider />
          <span>
            <Button
              onClick={() =>
                appendModifier({
                  modifierName: '',
                  selectType: '',
                  values: []
                })
              }
              variant="outlined"
            >
              Thêm tùy chỉnh
            </Button>
          </span>
        </Card> */}

        <Card id="variants">
          <CardTitle variant="subtitle1">Mẫu mã</CardTitle>
          <CheckBoxField name="hasVariant" label="Sản phẩm này có các mẫu mã" />
          {hasVariant && (
            <Box textAlign="left">
              <Stack direction="column">
                <Stack direction="column" justifyContent="start" spacing={2}>
                  <Typography variant="subtitle2">Tùy chọn</Typography>
                  <VariantForm name="variants" updateMode={updateMode} />
                </Stack>
              </Stack>
            </Box>
          )}
        </Card>

        <Card id="seo">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Box textAlign="left">
            <SeoForm />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
};

export default MiddleForm;
