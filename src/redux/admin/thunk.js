import { setCategories, setCollections, setStores, setTags } from '.';
import { getCategories, getCollection, getStores, getTags } from './api';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const fetchGlobalState = createAsyncThunk(
  'admin/fetchGlobalState',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const requestArr = [getCollection(), getCategories(), getTags(), getStores()];

      const [collections, categories, tags, stores] = await Promise.all(requestArr);
      dispatch(setCollections(collections));
      dispatch(setCategories(categories));
      dispatch(setTags(tags));
      dispatch(setStores(stores));

      return { collections, categories, tags };
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchGlobalState };
