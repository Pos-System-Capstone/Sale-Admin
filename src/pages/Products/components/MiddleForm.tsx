import { AddOutlined, Info } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { CheckBoxField, DraftEditorField } from 'components/form';
import SeoForm from 'components/form/Seo/SeoForm';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateProductForm, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import VariantForm from '../VariantForm';
import AddCategoryModal from './AddCategoryModal';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import CategoryTreeForm from './form/CategoryTreeForm';
import ProductImagesForm from './form/ProductImagesForm';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { control, watch } = useFormContext<CreateProductForm>();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);

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
            <BasicProductInfoForm />
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography my={2} variant="subtitle2">
                  Phân mục sản phẩm
                </Typography>
                <Button onClick={() => setShowAddCategoryModal(true)}>Thêm phân mục</Button>
              </Stack>
            </Box>
            <CategoryTreeForm />
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
          <ProductImagesForm />
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
