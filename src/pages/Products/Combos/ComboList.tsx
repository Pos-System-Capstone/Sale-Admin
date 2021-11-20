import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Stack, Typography, Button, Card, Tab, Box } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getCollections } from 'redux/collections/api';
import { getAllProduct } from 'redux/product/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CollectionTypeEnum, TCollection } from 'types/collection';
import { ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import { productColumns } from '../config';

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
    <Page title="Quản lý Combo | Reso-Sale">
      <TabContext value={activeTab}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h4" gutterBottom>
              Quản lý combo
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  navigate(
                    `${PATH_DASHBOARD.collections.new}?type=${CollectionTypeEnum.GroupCollection}`
                  );
                }}
                variant="outlined"
              >
                Tạo nhóm sản phẩm
              </Button>
              <Button
                onClick={() => {
                  navigate(`${PATH_DASHBOARD.combos.new}`);
                }}
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                Tạo combo
              </Button>
            </Stack>
          </Stack>

          <Box py={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Danh sách combo" value="1" />
              <Tab label="Nhóm sản phẩm" value="2" />
            </TabList>
          </Box>

          <Card style={{ padding: '1em' }}>
            <TabPanel value="1">
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
                  columns={productColumns}
                  rowKey="product_id"
                />
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <ResoTable
                defaultFilters={{
                  type: CollectionTypeEnum.GroupCollection
                }}
                // ref={tableRef}
                // onEdit={(collecton: TCollection) =>
                //   navigate(`${PATH_DASHBOARD.collections.root}/${collecton.id}`, {
                //     state: collecton
                //   })
                // }
                // onDelete={setCurrentDeleteItem}
                rowKey="id"
                getData={getCollections}
                columns={columns}
              />
            </TabPanel>
          </Card>
        </Container>
      </TabContext>
    </Page>
  );
};

export default ComboList;
