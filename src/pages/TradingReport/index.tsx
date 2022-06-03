/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack, Tab } from '@mui/material';
import { Box } from '@mui/system';
import menuApi from 'api/menu';
import { menuSchema, transformMenuForm } from 'components/form/Menu/helper';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// components
import { useNavigate } from 'react-router-dom';
import { getMenus } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import Grid from '@mui/material/Grid';
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';
import React from 'react';

import MenuWidgets from 'components/_dashboard/general-app/MenuWidgets';
import { Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Chart from 'react-apexcharts';

import clockIcon from '@iconify/icons-eva/clock-fill';
import activityFill from '@iconify/icons-eva/activity-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { STORE_NAME } from 'constraints';
import ResoTable from 'components/ResoTable/ResoTable';

export const menuColumns: TTableColumn<Menu>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    fixed: 'left',
    title: 'Tháng',
    // dataIndex: 'is_brand_mode',
    valueType: 'select',
    // hideInSearch: true,
    valueEnum: [
      {
        label: 'Tháng này',
        value: true
      },
      {
        label: 'Tháng trước',
        value: false
      },
      {
        label: 'Tuỳ chọn',
        value: false
      }
    ]
  },
  {
    title: 'Mang đi',
    hideInSearch: true
    // render: (_, data: Menu) =>
    //   data.start_time && data.end_time ? (
    //     <Typography>
    //       {fDate(data.start_time)} - {fDate(data.end_time)}
    //     </Typography>
    //   ) : (
    //     '-'
    //   )
  },
  {
    title: 'Tại store',
    // dataIndex: 'time_ranges',
    hideInSearch: true
    // render: (_: any, { time_ranges }: Menu) => (
    //   <Stack direction="row" spacing={1}>
    //     {time_ranges?.map(([from, to]) => (
    //       <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
    //     ))}
    //   </Stack>
    // )
  },
  {
    title: 'Cửa hàng',
    // dataIndex: 'day_filters',
    valueType: 'select',
    // hideInSearch: true,
    valueEnum: STORE_NAME
    // render: (_: any, { day_filters: dayFilters, menu_id }: Menu) => (
    //   <Stack direction="row" spacing={1}>
    //     {dayFilters?.map((day) => (
    //       <Chip
    //         size="small"
    //         key={`${menu_id}-${day}`}
    //         label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
    //       />
    //     ))}
    //   </Stack>
    // )
  },
  {
    title: 'Tổng số bill',
    // dataIndex: 'priority',
    hideInSearch: true
  },
  {
    title: 'Tổng doanh thu',
    // dataIndex: 'create_at',
    hideInSearch: true
  },
  {
    title: 'Tiền giảm giá',
    // dataIndex: 'create_at',
    hideInSearch: true
  },
  {
    title: 'Tổng doang thu sau giảm giá',
    // dataIndex: 'create_at',
    hideInSearch: true
  }
];

const TradingReport = () => {
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  const createMenuForm = useForm({
    resolver: yupResolver(menuSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      priority: 0
    }
  });

  const onDeleteMenu = async (menuId: number) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      console.log(`tableRef.current`, tableRef.current);
      tableRef.current?.reload();
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async (menu: Menu) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa menu "${menu.menu_name}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.menu_id);
      },
      onCancle: () => {}
    });
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const ChartFill = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  const Feature = [
    {
      title: 'GIỜ',
      icon: clockIcon,
      color: '#FAD02C',
      hoverColor: '#B47324'
    },
    {
      title: 'THỨ',
      icon: activityFill,
      color: '#189AB4',
      hoverColor: '#05445E'
    },
    {
      title: 'NGÀY',
      icon: alertCircleFill,
      color: '#76B947',
      hoverColor: '#2F5233'
    },
    {
      title: 'THÁNG',
      icon: alertTriangleFill,
      color: '#C197D2',
      hoverColor: '#613659'
    }
  ];

  const current = new Date();
  const firstDay = `${'1'}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  // const date = current.toLocaleDateString('vi-VI', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit'
  // });

  return (
    <Page
      title="Báo cáo doanh thu theo ngày"
      actions={() => [
        <ModalForm
          key="create-menu"
          onOk={async () => {
            try {
              await createMenuForm.handleSubmit(
                (data: any) => {
                  return menuApi.create(transformMenuForm(data));
                },
                (e) => {
                  throw e;
                }
              )();
              enqueueSnackbar('Tạp bảng giá thành công', {
                variant: 'success'
              });
              tableRef.current?.reload();
              return true;
            } catch (error) {
              console.log(`error`, error);
              enqueueSnackbar((error as any).message, {
                variant: 'error'
              });
              return false;
            }
          }}
          title={<Typography variant="h3">Xuất file Excel</Typography>}
          trigger={
            <Button variant="contained" startIcon={<Icon icon="fa-solid:file-export" />}>
              Xuất file Excel
            </Button>
          }
        ></ModalForm>
      ]}
    >
      <p style={{ marginTop: '-45px', paddingBottom: '50px' }}>
        ({firstDay} - {date})
      </p>
      <Box sx={{ width: '100%', paddingBottom: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Feature.map((item) => (
            <Grid key={item.title} item xs={3}>
              <MenuWidgets Features={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Card>
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing={2}>
              <Box sx={{ paddingTop: '40px' }}>
                <ResoTable
                  ref={tableRef}
                  onDelete={onConfirmDelete}
                  rowKey="menu_id"
                  onEdit={(menu: Menu) =>
                    navigate(`${PATH_DASHBOARD.tradingReport.root}/${menu.menu_id}`, {
                      state: menu
                    })
                  }
                  getData={getMenus}
                  columns={menuColumns}
                />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <Chart
                        options={ChartFill.options}
                        series={ChartFill.series}
                        type="bar"
                        width="500"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Chart
                        options={ChartFill.options}
                        series={ChartFill.series}
                        type="area"
                        width="500"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Card>
    </Page>
  );
};

export default TradingReport;
