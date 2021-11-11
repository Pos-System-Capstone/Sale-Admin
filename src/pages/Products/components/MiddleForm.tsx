import { Box, Divider, Stack, Typography } from '@mui/material';
import { DraftEditor, QuillEditor } from 'components/editor';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputField, RadioGroupField, UploadImageField } from '../../../components/form';
import { PRODUCT_MASTER, PRODUCT_SINGLE, PRODUCT_TYPE_DATA } from '../../../constraints';
import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { control, setValue, handleSubmit, watch } = useFormContext();

  const isProductMaster = watch('product_type') == PRODUCT_MASTER;

  return (
    <Box p={1} flex={1}>
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Chi tiết sản phẩm
          </CardTitle>
          <Stack spacing={2} direction="row" width="100%">
            <UploadImageField.Avatar label="Ảnh đại diện" name="pic_url" />
            <Stack spacing={2} flex={1}>
              <InputField fullWidth name="code" label="Mã sản phẩm" required size="small" />
              <InputField
                fullWidth
                name="product_name"
                label="Tên sản phẩm"
                required
                size="small"
              />
            </Stack>
          </Stack>
          <Typography my={2} variant="subtitle2">
            Loại sản phẩm
          </Typography>
          <RadioGroupField
            size="small"
            name="product_type"
            options={[
              {
                value: `${PRODUCT_MASTER}`,
                typeCode: 'master',
                label: 'Dòng sản phẩm'
              },
              {
                value: `${PRODUCT_SINGLE}`,
                typeCode: 'single',
                label: 'SP Đơn'
              }
            ]}
            fullWidth
            sx={{
              flexDirection: 'row'
            }}
          />
          <Box>
            <Typography my={2} variant="subtitle2">
              Miêu tả
            </Typography>
            <Controller
              name="description"
              render={({ field }) => (
                <DraftEditor editorState={field.value} onEditorStateChange={field.onChange} />
              )}
            />
          </Box>
        </Box>
      </Card>

      {isProductMaster && (
        <Card id="variants">
          <Box textAlign="left">
            <CardTitle variant="subtitle1">Mẫu mã</CardTitle>
            <Stack direction="column">
              <Stack direction="column" justifyContent="start" spacing={2}>
                <Divider />
                <Typography variant="subtitle2">Tùy chọn</Typography>
                <VariantForm name="variants" updateMode={updateMode} />
              </Stack>
            </Stack>
          </Box>
        </Card>
      )}

      <Card id="seo">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputField
                name="seo_name"
                size="small"
                type="text"
                label="Đường dẫn SEO"
                sx={{
                  width: '50%'
                }}
              />
              <InputField
                name="seo_key_words"
                size="small"
                type="text"
                label="Từ khóa SEO"
                sx={{
                  width: '50%'
                }}
              />
            </Stack>
            <InputField
              name="seo_description"
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              label="Mô tả SEO"
            />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default MiddleForm;
