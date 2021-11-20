import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, Typography } from '@mui/material';
import Page from 'components/Page';
import { useState } from 'react';
import CategoryExtraTab from './components/CategoryExtraTab';
import CategoryInfoTab from './components/CategoryInfoTab';
import CategoryModifierTab from './components/CategoryModifierTab';

interface Props {}

const UpdateCategory = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Page title="Cập nhật phân mục">
        <TabContext value={activeTab}>
          <Container maxWidth="lg" sx={{ mx: 'auto' }}>
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              Cập nhật phân mục
            </Typography>
            <Box py={2}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Thông tin chung" value="1" />
                <Tab label="Sản phẩm đi kèm" value="2" />
                <Tab label="Tuỳ chỉnh" value="3" />
              </TabList>
            </Box>

            <Stack spacing={2}>
              <TabPanel value="1">
                <CategoryInfoTab />
              </TabPanel>
              <TabPanel value="2">
                <CategoryExtraTab />
              </TabPanel>
              <TabPanel value="3">
                <CategoryModifierTab />
              </TabPanel>
            </Stack>
          </Container>
        </TabContext>
      </Page>
    </>
  );
};

export default UpdateCategory;
