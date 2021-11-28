import { Box } from '@mui/material';
import MenuForm from 'components/form/Menu/MenuForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { Card, CardTitle } from '../../Products/components/Card';

const MenuInfoTab = ({ onSubmit }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Menu</CardTitle>
      <MenuForm />
      <Box textAlign="right" mt={2}>
        <LoadingAsyncButton size="small" onClick={onSubmit} variant="contained">
          Cập nhật
        </LoadingAsyncButton>
      </Box>
    </Card>
  </Box>
);

export default MenuInfoTab;
