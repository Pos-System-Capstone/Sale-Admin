import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import promotionApi, {
  DISCOUNT_TYPE_DATA,
  PROMOTION_TYPE_DATA,
  STATUS_TYPE_DATA,
  TPromotionBase
} from 'api/promotion/promotion';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TTableColumn } from 'types/table';
// import { CollectionTypeEnum } from 'types/collection';

interface Props {}

const Promotion = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const ref = useRef<any>();

  const DISCOUNT_TYPE_ENUM = DISCOUNT_TYPE_DATA();
  const STATUS_TYPE_ENUM = STATUS_TYPE_DATA();
  const PROMOTION_TYPE_ENUM = PROMOTION_TYPE_DATA();
  const promotionColumn: TTableColumn<TPromotionBase>[] = [
    {
      title: `${translate('promotionSystem.promotion.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.name')}`,
      dataIndex: 'promotionName',
      valueType: 'text'
    },
    {
      title: `${translate('promotionSystem.promotion.table.type')}`,
      dataIndex: 'promotionType',
      valueEnum: PROMOTION_TYPE_ENUM,
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.action')}`,
      hideInSearch: false,
      dataIndex: 'actionType',
      valueEnum: DISCOUNT_TYPE_ENUM,
      valueType: 'select',
      formProps: {
        fullWidth: true
      }
    },
    {
      title: `${translate('promotionSystem.promotion.table.startDate')}`,
      dataIndex: 'startDate',
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.status')}`,
      dataIndex: 'status',
      valueEnum: STATUS_TYPE_ENUM,
      valueType: 'select',
      formProps: {
        fullWidth: true
      }
      // valueEnum: [
      //   {
      //     label: `${translate('promotionSystem.promotion.table.statusType.all')}`,
      //     value: 'true'
      //   },
      //   {
      //     label: `${translate('promotionSystem.promotion.table.statusType.draft')}`,
      //     value: 'false'
      //   },
      //   {
      //     label: `${translate('promotionSystem.promotion.table.statusType.published')}`,
      //     value: 'true'
      //   },
      //   {
      //     label: `${translate('promotionSystem.promotion.table.statusType.unPublished')}`,
      //     value: 'true'
      //   },
      //   {
      //     label: `${translate('promotionSystem.promotion.table.statusType.expired')}`,
      //     value: 'false'
      //   }
      // ],
    }
  ];

  return (
    <Page
      // title="Manage Promotion"
      title={`${translate('promotionSystem.promotion.title')}`}
      actions={() => [
        <Button
          key="create-promotion"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.promotion.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('promotionSystem.promotion.createPromotion.createPromotion')}
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            pagination
            ref={ref}
            getData={() =>
              promotionApi.getPromotion({
                BrandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                status: 0
              })
            }
            columns={promotionColumn}
            rowKey="product_id"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default Promotion;
