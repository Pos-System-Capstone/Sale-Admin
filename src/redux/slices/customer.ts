import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '../../@types/common';
import { store } from '../store';
// utils
import { CustomerState, customersListData } from '../../@types/customer';

// ----------------------------------------------------------------------

const initialState: CustomerState = {
  isLoading: false,
  error: false,
  customers: {
    pageNumber: 1,
    pageSize: 10,
    results: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0
  },
  customer: null,
  sortBy: null,
  filter: {
    page: 1,
    pageSize: 10
  }
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
    },

    // GET PRODUCT
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    setFilter(state, action: PayloadAction<PaginationRequest>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<PaginationRequest>) {
      console.log('');
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setFilter, setFilterWithDebounce } = slice.actions;

// ----------------------------------------------------------------------

export function getCustomers() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      // eslint-disable-next-line no-new
      new Promise((resolve) => {
        setTimeout(() => {
          const data = customersListData;
          dispatch(
            slice.actions.getCustomersSuccess({
              pageNumber: 1,
              pageSize: 10,
              results: data,
              totalNumberOfPages: 0,
              totalNumberOfRecords: 0
            })
          );
          resolve(true);
        }, 2000);
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// export function getProduct(name: string) {
//   return async () => {
//     const { dispatch } = store;
//     dispatch(slice.actions.startLoading());
//     try {
//       const response: { data: { product: Customer } } = await axios.get('/api/products/product', {
//         params: { name }
//       });
//       dispatch(slice.actions.getCustomerSuccess(response.data.product));
//     } catch (error) {
//       console.error(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
