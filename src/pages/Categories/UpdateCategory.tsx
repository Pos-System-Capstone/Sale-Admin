import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, Typography } from '@mui/material';
import Page from 'components/Page';
import useCategory from 'hooks/categories/useCategory';
import { useState } from 'react';
import { useParams } from 'react-router';
import CategoryExtraTab from './components/CategoryExtraTab';
import CategoryInfoTab from './components/CategoryInfoTab';
import CategoryModifierTab from './components/CategoryModifierTab';

interface Props {}

const UpdateCategory = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const { id } = useParams();

  const { data: category } = useCategory(Number(id));
  const isExtra = category?.is_extra;
  return (
    <>
      <Page title="Cập nhật Danh mục">
        <TabContext value={activeTab}>
          <Container maxWidth="lg" sx={{ mx: 'auto' }}>
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              Cập nhật Danh mục
            </Typography>
            <Box py={2}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Thông tin chung" value="1" />
                {!isExtra && <Tab label="Sản phẩm đi kèm" value="2" />}
                {!isExtra && <Tab label="Tuỳ chỉnh" value="3" />}
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
