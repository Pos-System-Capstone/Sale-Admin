/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import React from 'react';

import {
  Checkbox,
  CircularProgress,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import get from 'lodash/get';
import { useAntdTable } from 'ahooks';
import { makeStyles, withStyles } from '@material-ui/styles';
import Icon from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trashIcon from '@iconify/icons-eva/trash-outline';
import editIcon from '@iconify/icons-eva/edit-outline';
import EmptyContent from 'components/EmptyContent';

import { getCellValue } from './utils';

const StickyLeftTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'white',
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    backgroundColor: 'white',
    minWidth: '50px',
    left: '0',
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1
  }
}))(TableCell);

const StickyRightTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'white',
    // color: theme.palette.common.white,
    right: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    backgroundColor: 'white',
    minWidth: '50px',
    right: '0',
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1
  }
}))(TableCell);

const useStyles = makeStyles({
  root: {
    background: 'rgb(244, 246, 248)',
    minWidth: '120px'
  },
  actionColumn: {
    minWidth: '70px',
    width: '70px'
  }
});

const ResoTable = React.forwardRef(
  (
    {
      columns = [],
      dataSource = [],
      pagination = {
        rowsPerPage: 10,
        page: 1,
        count: 1
      },
      filters,
      onEdit = () => null,
      onDelete = () => null,
      getData = () => [],
      rowKey = 'id',
      checkboxSelection,
      onChangeSelection
    },
    ref
  ) => {
    const classes = useStyles();
    const [_paginaton, setPaginaton] = React.useState(pagination);
    const [_selectedIds, setSelectedIds] = React.useState([]);
    const [_anchorEl, setAnchorEl] = React.useState(null);
    const [_openMenu, setOpenMenu] = React.useState(null);

    const openEditMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const closeEditMenu = () => {
      setAnchorEl(null);
    };

    const { tableProps, search, loading, data } = useAntdTable(
      (params) =>
        getData({ ...params, ...params.filters, page: params.current, size: params.pageSize }),
      {
        defaultPageSize: 10,
        formatResult: (res) => ({
          total: res.data.metadata?.total,
          list: res.data.data ?? [],
          success: true
        }),
        onError: console.log
      }
    );
    const { current, pageSize, total } = tableProps?.pagination ?? {};

    React.useImperativeHandle(ref, () => ({
      reload: () => search?.submit()
    }));

    // for table pagination
    React.useEffect(() => {
      if (!current || !pageSize || !total) return;

      setPaginaton({ rowsPerPage: pageSize, count: total, page: current });
    }, [current, pageSize, total]);

    React.useEffect(() => {
      const { current, pageSize, total } = tableProps.pagination;
      const { onChange: onChangeTable } = tableProps;
      if (filters) {
        onChangeTable({ current, pageSize, total }, filters);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    React.useEffect(() => {
      if (typeof onChangeSelection === 'function') {
        const selectionData = data?.list.filter((d) => _selectedIds.includes(d[rowKey]));
        onChangeSelection(_selectedIds, selectionData);
      }
    }, [_selectedIds, onChangeSelection, data?.list, rowKey]);

    const onSelectAllClick = React.useCallback(() => {
      setSelectedIds(data.list?.map((d) => d[rowKey]));
    }, [rowKey, data]);

    const handleClick = React.useCallback(
      (event, name) => {
        const selectedIndex = _selectedIds.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(_selectedIds, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(_selectedIds.slice(1));
        } else if (selectedIndex === _selectedIds.length - 1) {
          newSelected = newSelected.concat(_selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            _selectedIds.slice(0, selectedIndex),
            _selectedIds.slice(selectedIndex + 1)
          );
        }

        setSelectedIds(newSelected);
      },
      [_selectedIds]
    );

    const tableHeader = React.useMemo(() => {
      const headers = [...columns];

      const tableHeaders = [];

      if (checkboxSelection) {
        tableHeaders.push(
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={_selectedIds.length > 0 && _selectedIds.length < data?.list?.length}
              checked={data?.list?.length > 0 && _selectedIds.length === data?.list?.length}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        );
      }

      headers.forEach((header, index) => {
        const CellComp = index === 0 ? StickyLeftTableCell : TableCell;
        tableHeaders.push(
          <CellComp
            className={classes.root}
            key={`header_${index}`}
            align={header.alignRight ? 'right' : 'left'}
          >
            <TableSortLabel hideSortIcon>{getCellValue(header.title, null, header)}</TableSortLabel>
          </CellComp>
        );
      });

      tableHeaders.push(
        <StickyRightTableCell
          className={[classes.root, classes.actionColumn].join(' ')}
          key="column-action"
          align="center"
        >
          <TableSortLabel hideSortIcon>
            <span />
          </TableSortLabel>
        </StickyRightTableCell>
      );

      return <TableRow>{tableHeaders}</TableRow>;
    }, [
      checkboxSelection,
      classes.actionColumn,
      classes.root,
      columns,
      data?.list?.length,
      onSelectAllClick,
      _selectedIds.length
    ]);

    const tableBodyContent = React.useMemo(() => {
      if (!data) return;
      const isSelected = (key) => _selectedIds.indexOf(key) !== -1;

      const body = [...columns];
      const tableBodys = [];
      data.list.forEach((data) => {
        const bodyRow = body.map((column, index) => {
          const CellComp = index === 0 ? StickyLeftTableCell : TableCell;

          let cell;

          if (typeof column.render === 'function') {
            cell = column.render(get(data, column.dataIndex, '-'), data) ?? '-';
          } else {
            cell = (
              <Typography variant="subtitle2" noWrap>
                {get(data, column.dataIndex, '-')}
              </Typography>
            );
          }

          return <CellComp key={`${column.title}-${data.product_id}`}>{cell}</CellComp>;
        });

        if (checkboxSelection) {
          const isItemSelected = isSelected(data[rowKey]);
          bodyRow.unshift(
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': data[rowKey] }} />
            </TableCell>
          );
        }

        const handleEdit = () => onEdit(data);
        const handleDelete = () => onDelete(data);

        const ActionCell = (
          <StickyRightTableCell key={`edit-cell-${data.product_id}`}>
            <IconButton
              onClick={(e) => {
                openEditMenu(e);
                setOpenMenu(data.product_id);
              }}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
            >
              <Icon icon={moreVerticalFill} />
            </IconButton>
            <Menu
              anchorEl={_anchorEl}
              MenuListProps={{
                'aria-labelledby': 'edit-menu'
              }}
              onClose={(e) => {
                closeEditMenu(e);
                setOpenMenu(null);
              }}
              open={data.product_id === _openMenu}
              key={`menu-edit-${data.product_id}`}
              id={`menu-edit-${data.product_id}`}
            >
              <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
                <ListItemIcon>
                  <Icon icon={trashIcon} />
                </ListItemIcon>
                <ListItemText>Xóa</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <Icon icon={editIcon} />
                </ListItemIcon>
                <ListItemText>Điều chỉnh</ListItemText>
              </MenuItem>
            </Menu>
          </StickyRightTableCell>
        );

        bodyRow.push(ActionCell);

        tableBodys.push(
          <TableRow
            onClick={(event) => checkboxSelection && handleClick(event, data[rowKey])}
            role="checkbox"
          >
            {bodyRow}
          </TableRow>
        );
      });
      return tableBodys;
    }, [
      data,
      columns,
      _selectedIds,
      checkboxSelection,
      _anchorEl,
      _openMenu,
      rowKey,
      onEdit,
      onDelete,
      handleClick
    ]);

    return (
      <Container style={{ padding: 0 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>{tableHeader}</TableHead>
            <TableBody>
              {loading ? (
                <TableRow style={{ height: '150px' }}>
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)'
                    }}
                  />
                </TableRow>
              ) : (
                tableBodyContent
              )}
              {!loading && !data?.list?.length && (
                <EmptyContent
                  title="Trống"
                  sx={{
                    width: '100%'
                  }}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableProps}
          {..._paginaton}
          onPageChange={(_, page) =>
            tableProps.onChange({ ...tableProps.pagination, current: page })
          }
          onRowsPerPageChange={(e) =>
            tableProps.onChange({ ...tableProps.pagination, pageSize: e.target.value })
          }
        />
      </Container>
    );
  }
);

export default ResoTable;
