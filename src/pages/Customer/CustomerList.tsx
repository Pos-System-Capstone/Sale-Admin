/* eslint-disable camelcase */
import editIcon from '@iconify/icons-eva/edit-outline';
import plusFill from '@iconify/icons-eva/plus-fill';
import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
// material
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useTable } from 'components/common/useTable';
import EmptyContent from 'components/EmptyContent';
import Label from 'components/Label';
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import useLocales from 'hooks/useLocales';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import { useNavigate } from 'react-router-dom';
import { getCustomers, setFilter, setFilterWithDebounce } from 'redux/slices/customer';
import { PATH_DASHBOARD } from 'routes/paths';
import { PaginationRequest, Response } from '../../@types/common';
import { Customer } from '../../@types/customer';

const StickyRightTableCell = withStyles((theme) => ({
  head: {
    // color: theme.palette.common.white,
    right: 0,
    position: 'sticky',
    zIndex: theme.zIndex.modal
  },
  body: {
    minWidth: '50px',
    right: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  }
}))(TableCell);

const CustomerListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const rs = useSelector((state: any) => state.customer.customers);
  const filter = useSelector((state: any) => state.customer.filter);
  const loading = useSelector((state: any) => state.customer.isLoading);
  console.log(rs);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const headCells = [
    {
      id: 'index',
      label: translate('pages.customers.table.no'),
      align: 'center',
      disableSorting: true
    },
    {
      id: 'firstName',
      label: translate('pages.customers.table.name'),
      align: 'left',
      disableSorting: true
    },
    {
      id: 'homeEmail',
      label: translate('pages.customers.table.homeEmail'),
      disableSorting: true,
      align: 'left'
    },
    {
      id: 'companyName',
      label: translate('pages.customers.table.companyName'),
      disableSorting: true,
      align: 'left'
    },
    {
      id: 'tags',
      label: translate('pages.customers.table.tags'),
      disableSorting: true,
      align: 'left'
    },
    {
      id: 'status',
      label: translate('common.status'),
      disableSorting: true,
      align: 'left'
    },
    {
      id: 'action',
      label: '',
      disableSorting: true,
      align: 'right'
    }
  ];
  const onPageChange = (page: number) => {
    dispatch(
      setFilter({
        ...filter,
        page: page + 1
      })
    );
  };
  const onRowPerPageChange = (perPage: number) => {
    dispatch(
      setFilter({
        ...filter,
        pageSize: perPage
      })
    );
  };
  const onSortChange = (colName: string, sortType: number) => {
    dispatch(
      setFilter({
        ...filter,
        colName,
        sortType
      })
    );
  };
  const handelSearchDebounce = (newFilter: PaginationRequest) => {
    dispatch(setFilterWithDebounce(newFilter));
  };
  const handleEdit = () => {};
  const handleDelete = () => {};
  const { TblHead, TblPagination, SearchNotFounded, NoData, LoadingCircle } = useTable({
    rs,
    headCells,
    filter,
    onPageChange,
    onRowPerPageChange,
    onSortChange
  });
  const tableBody = (keySearch: string, data: Response<Customer>) => {
    if (keySearch === undefined && data.results.length === 0) {
      return <NoData />;
    }
    if (keySearch !== undefined && data.results.length === 0) {
      return <SearchNotFounded />;
    }
    return rs.results?.map((e: Customer, idx: number) => (
      <TableRow key={e.id}>
        <TableCell align="center" width={70}>
          {idx + 1}
        </TableCell>
        <TableCell align="left">{`${e.firstName} ${e.lastName}`}</TableCell>
        <TableCell align="left">{e.homeEmail}</TableCell>
        <TableCell align="left">{e.companyName}</TableCell>
        <TableCell align="left">{e.tags}</TableCell>
        <TableCell align="left">
          <Label color={e.status === 1 ? 'success' : 'default'}>
            {e.status === 1 ? translate('common.available') : translate('common.notAvailable')}
          </Label>
        </TableCell>
        <TableCell align="right" width={100}>
          <StickyRightTableCell>
            <Stack direction="row" justifyContent="flex-end">
              <Tooltip title="Xóa">
                <IconButton onClick={handleDelete} sx={{ color: 'red' }}>
                  <Icon icon={trashIcon} />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Điều chỉnh">
                <IconButton onClick={handleEdit}>
                  <Icon icon={editIcon} />
                </IconButton>
              </Tooltip>
            </Stack>
          </StickyRightTableCell>
        </TableCell>
      </TableRow>
    ));
  };

  // const columns = [
  //   {
  //     title: translate('common.status'),
  //     dataIndex: 'status',
  //     render: (status) => (
  //       <Label color={status === 1 ? 'success' : 'default'}>
  //         {status === 1 ? translate('common.available') : translate('common.notAvailable')}
  //       </Label>
  //     )
  //   }
  // ];

  return (
    <Page title={`Dashboard ${translate('pages.customers.listTitle')} | Reso Sales`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('pages.customers.listTitle')}
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.customers.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('pages.customers.addBtn')}
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            {/* <StoreSearchForm onChange={setFilters} /> */}
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TblHead />
                  <TableBody>
                    {loading ? <LoadingCircle /> : tableBody(filter.keySearch, rs)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TblPagination />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default CustomerListPage;
