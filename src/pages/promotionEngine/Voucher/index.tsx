/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { TabContext } from '@mui/lab';
// material
import { Button, Card } from '@mui/material';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProductBase } from 'types/product';
//
import voucherApi, { TVoucherBase } from 'api/promotion/voucher';
import { deleteProdById } from 'redux/product/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TTableColumn } from 'types/table';

// ----------------------------------------------------------------------

export default function Voucher() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  const productColumns: TTableColumn<TVoucherBase>[] = [
    {
      title: `${t('promotionSystem.voucher.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    // {
    //   title: 'Hình ảnh',
    //   dataIndex: 'pic_url',
    //   hideInSearch: true,
    //   render: (src, { product_name }: any) => (
    //     <Avatar
    //       alt={product_name}
    //       src={src}
    //       variant="square"
    //       style={{ width: '54px', height: '54px' }}
    //     />
    //   )
    // },
    {
      title: `${t('promotionSystem.voucher.table.name')}`,
      dataIndex: 'voucherName'
    },
    // {
    //   title: 'Giá mặc định',
    //   dataIndex: 'price',
    //   hideInSearch: true
    // },
    {
      title: `${t('promotionSystem.voucher.table.actionName')}`,
      dataIndex: 'action',
      // renderFormItem: () => <AutocompleteCategory name="cat-id" label="Danh mục" />
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.total')}`,
      dataIndex: 'quantity',
      hideInSearch: true

      // dataIndex: 'product_type',
      // valueType: 'select',
      // valueEnum: PRODUCT_TYPE_DATA
      // hideInSearch: true
      // render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value == type)?.label} />
    },
    {
      title: `${t('promotionSystem.voucher.table.redeemed')}`,
      dataIndex: 'redempedQuantity',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.used')}`,
      dataIndex: 'usedQuantity',
      hideInSearch: true
    }

    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'is_available',
    //   width: 150,
    //   render: (available) => (
    //     <Label color={available ? 'primary' : 'default'}>
    //       {available ? 'Đang bán' : 'Ngừng bán'}
    //     </Label>
    //   ),
    //   valueEnum: [
    //     {
    //       label: 'Đang bán',
    //       value: 'true'
    //     },
    //     {
    //       label: 'Ngừng bán',
    //       value: 'false'
    //     }
    //   ],
    //   valueType: 'select',
    //   formProps: {
    //     fullWidth: true
    //   }
    // }
  ];

  const editProuct = (data: TProductBase) => {
    if (data.product_type === 1) {
      navigate(`${PATH_DASHBOARD.combos.editById(data.product_id)}`);
    } else {
      navigate(`${PATH_DASHBOARD.products.root}/${data.product_id}`);
    }
  };

  const onDelete = (currentDeleteItem: TProductBase) => {
    confirm({
      title: (
        <>
          Xác nhận xóa <strong>{currentDeleteItem?.product_name}</strong>
        </>
      ),
      content: 'Sản phẩm này sẽ bị xoá khỏi hệ thống',
      onOk: () => {
        return deleteProdById(currentDeleteItem.product_id!)
          .then((res) => {
            enqueueSnackbar(t('common.deleteSuccess'), {
              variant: 'success'
            });
          })
          .then(() => ref.current?.reload())
          .catch((err) => {
            enqueueSnackbar(t('common.error'), {
              variant: 'error'
            });
          });
      }
    });
  };

  useEffect(() => {
    const form = ref.current?.formControl;
    if (!form) return;
    form.setValue('is-extra-cate', activeTab === '2');
  }, [activeTab, ref]);

  return (
    <Page
      title={`${t('promotionSystem.voucher.title')}`}
      actions={() => [
        // <Button
        //   key="add-product-extra"
        //   onClick={() => {
        //     navigate(`${PATH_DASHBOARD.products.newProduct}?productType=${ProductTypeEnum.Extra}`);
        //   }}
        //   variant="outlined"
        //   startIcon={<Icon icon={plusFill} />}
        // >
        //   Thêm extra
        // </Button>,
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.voucher.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {`${t('promotionSystem.voucher.addVoucher.newVoucher')}`}
        </Button>
      ]}
    >
      <Card>
        <TabContext value={activeTab}>
          {/* <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Danh mục sản phẩm" value="1" />
              <Tab label="Danh mục extra" value="2" />
            </TabList>
          </Box> */}
          <ResoTable
            ref={ref}
            pagination
            getData={() =>
              voucherApi.getVoucher({
                brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                ActionType: 0,
                PostActionType: 0
              })
            }
            onEdit={editProuct}
            onDelete={onDelete}
            columns={productColumns}
            rowKey="product_id"
          />
        </TabContext>
      </Card>
    </Page>
  );
}
