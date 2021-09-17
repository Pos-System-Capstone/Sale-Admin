import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import EmptyContent from 'components/EmptyContent';
import { PaginationRequest, Response } from '../../@types/common';

interface useTableProps {
  rs: Response<any>;
  headCells: any;
  filter: PaginationRequest;
  onPageChange: (newPage: number) => void;
  onRowPerPageChange: (perPage: number) => void;
  onSortChange: (colName: string, sortType: number) => void;
}
// global const
const PAGES = [10, 15, 20, 50];
const SORT_TYPE_ASC = 0;
const SORT_TYPE_DESC = 1;

export function useTable({
  rs,
  headCells,
  filter,
  onPageChange,
  onRowPerPageChange,
  onSortChange
}: useTableProps) {
  const { colName, sortType } = filter;
  let order: any;
  sortType === SORT_TYPE_ASC ? (order = 'asc') : (order = 'desc');

  const TblContainer: any = (props: any) => (
    <Table className="items-center w-full bg-transparent border-collapse" size="small">
      {props.children}
    </Table>
  );
  const { pageNumber, pageSize, totalNumberOfPages, totalNumberOfRecords } = rs;
  // functions
  const handelPageChange = (event: any, newPage: number) => {
    onPageChange(newPage);
  };
  const handelRowPerPageChange = (event: any) => {
    onRowPerPageChange(event.target.value);
  };
  const handelPagingNumberChange = (e: any, page: number) => {
    onPageChange(page - 1);
  };
  const TblHead: any = (props: any) => {
    const handleSortRequest = (cellId: any) => {
      order === 'desc' ? (order = 'asc') : (order = 'desc');
      const isAsc = colName === cellId && order === 'asc';
      const sort = isAsc ? SORT_TYPE_ASC : SORT_TYPE_DESC;
      onSortChange(cellId, sort);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              sortDirection={colName === headCell.id ? order : false}
              style={{ color: 'primary', textAlign: headCell.align ? headCell.align : 'left' }}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  hideSortIcon
                  active={colName === headCell.id}
                  direction={colName === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const TblPagination: any = (props: any) => (
    <Grid container justifyContent="center" alignContent="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <TablePagination
          onPageChange={handelPageChange}
          component="div"
          rowsPerPageOptions={PAGES}
          page={pageNumber - 1}
          rowsPerPage={pageSize}
          count={totalNumberOfRecords}
          onRowsPerPageChange={handelRowPerPageChange}
        />
      </Grid>
    </Grid>
  );
  const SearchNotFounded: any = () => (
    <TableRow style={{ height: 53 * 10 }}>
      <TableCell colSpan={20}>
        <Typography gutterBottom align="center" variant="subtitle1">
          Không tìm thấy dữ liệu
        </Typography>
        <Typography variant="body2" align="center">
          Không có kết quả trùng khớp!!!. Thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
        </Typography>
      </TableCell>
    </TableRow>
  );
  const LoadingCircle: any = () => (
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
  );
  const NoData: any = () => (
    <TableRow style={{ height: 53 * 10 }}>
      <TableCell colSpan={20}>
        <Box width="100%">
          <EmptyContent
            title="Trống"
            sx={{
              width: '100%'
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
  return {
    TblContainer,
    TblHead,
    TblPagination,
    NoData,
    LoadingCircle,
    SearchNotFounded
  };
}
