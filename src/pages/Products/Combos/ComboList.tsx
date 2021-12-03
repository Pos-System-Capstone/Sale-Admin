import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllProduct } from 'redux/product/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CollectionTypeEnum, TCollection } from 'types/collection';
import { ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import { comboColumns } from './components/columns';

interface Props {}

const ComboList = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');
  const { translate } = useLocales();
  const navigate = useNavigate();
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const columns: TTableColumn<TCollection>[] = [
    {
      title: translate('combos.table.comboName'),
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: translate('combos.table.collectionNameEn'),
      dataIndex: 'name_eng',
      fixed: 'left',
      hideInSearch: true
    },
    {
      title: translate('combos.table.store'),
      dataIndex: 'store_id',
      fixed: 'left',
      hideInSearch: true
    },
    {
      title: translate('combos.table.position'),
      dataIndex: 'position',
      hideInSearch: true
    }
  ];

  return (
    <Page
      title="Quản lý Combo"
      actions={() => [
        <Button
          key="add-combo-group"
          onClick={() => {
            navigate(
              `${PATH_DASHBOARD.collections.new}?type=${CollectionTypeEnum.GroupCollection}`
            );
          }}
          variant="outlined"
        >
          Tạo nhóm sản phẩm
        </Button>,
        <Button
          key="add-combo"
          onClick={() => {
            navigate(`${PATH_DASHBOARD.combos.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Tạo combo
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            pagination
            defaultFilters={{
              'product-type': ProductTypeEnum.Combo
            }}
            getData={getAllProduct}
            onEdit={(data: TProductBase) =>
              navigate(`${PATH_DASHBOARD.combos.editById(data.product_id)}`)
            }
            //   onDelete={setCurrentDeleteItem}
            columns={comboColumns}
            rowKey="product_id"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ComboList;
