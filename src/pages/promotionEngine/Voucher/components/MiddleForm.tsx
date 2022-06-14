// import { Info } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import SeoForm from 'components/form/Seo/SeoForm';
// import Label from 'components/Label';
// import ModalForm from 'components/ModalForm/ModalForm';
// import ResoTable from 'components/ResoTable/ResoTable';
import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
// import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import SubMiddleForm from './form/SubMiddleForm';
// import ProductImagesForm from './form/ProductImagesForm';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<CreateProductForm>();

  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);
  const cateId = watch('cat_id');
  const productType = watch('product_type');
  const isExtraProduct = productType === ProductTypeEnum.Extra;

  const { data: extras } = useExtraCategory(Number(cateId));

  const productExtraColumns: TTableColumn<TProductBase>[] = [
    {
      title: 'Tên',
      dataIndex: 'product_name'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code'
    },

    {
      title: 'Giá',
      dataIndex: 'price'
    }
  ];

  return (
    <Box>
      <Stack spacing={2}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              VOUCHER GROUP BUILDER
            </CardTitle>
            <Stack sx={{ width: '100%', pb: '15px', pt: '20px' }} spacing={1}>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>A voucher is a bond of the redeemable transaction
                type which is worth a certain monetary value and which may be spent only for
                specific reasons or on specific goods.
              </Alert>
            </Stack>
            <BasicProductInfoForm />
          </Stack>
        </Card>
        {!isExtraProduct && <SubMiddleForm hasVariant={hasVariant} />}
      </Stack>
    </Box>
  );
};

export default MiddleForm;
