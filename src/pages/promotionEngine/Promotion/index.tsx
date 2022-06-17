import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import promotionApi, { PROMOTION_TYPE_DATA, TPromotionBase } from 'api/promotion/promotion';
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

  const PROMOTION_TYPE_DATE_ENUM = PROMOTION_TYPE_DATA();
  const promotionColumn: TTableColumn<TPromotionBase>[] = [
    {
      title: `${translate('promotionSystem.promotion.table.no')}`,
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.name')}`,
      valueType: 'text'
    },
    {
      title: `${translate('promotionSystem.promotion.table.type')}`,
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.action')}`,
      hideInSearch: false,
      // dataIndex: 'actionType',
      valueEnum: PROMOTION_TYPE_DATE_ENUM,
      valueType: 'select',
      formProps: {
        fullWidth: true
      }
    },
    {
      title: `${translate('promotionSystem.promotion.table.startDate')}`,
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.status')}`,
      valueEnum: [
        {
          label: `${translate('promotionSystem.promotion.table.statusType.all')}`,
          value: 'true'
        },
        {
          label: `${translate('promotionSystem.promotion.table.statusType.draft')}`,
          value: 'false'
        },
        {
          label: `${translate('promotionSystem.promotion.table.statusType.published')}`,
          value: 'true'
        },
        {
          label: `${translate('promotionSystem.promotion.table.statusType.unPublished')}`,
          value: 'true'
        },
        {
          label: `${translate('promotionSystem.promotion.table.statusType.expired')}`,
          value: 'false'
        }
      ],
      valueType: 'select',
      formProps: {
        fullWidth: true
      }
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
