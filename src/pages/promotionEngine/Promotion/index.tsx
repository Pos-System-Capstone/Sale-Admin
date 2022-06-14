import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { promotionColumn } from './components/columns';
// import { CollectionTypeEnum } from 'types/collection';

interface Props {}

const Promotion = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const navigate = useNavigate();
  const ref = useRef<any>();

  return (
    <Page
      title="Manage Promotion"
      actions={() => [
        <Button
          key="create-promotion"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.promotion.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          New Promotion
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            pagination
            ref={ref}
            // defaultFilters={{
            //   'product-type': ProductTypeEnum.Combo
            // }}
            // getData
            showSettings={false}
            columns={promotionColumn}
            rowKey="product_id"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default Promotion;
