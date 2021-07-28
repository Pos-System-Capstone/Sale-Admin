import { setCategories, setCollections, setTags } from '.';
import { getCategories, getCollection, getTags } from './api';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const fetchGlobalState = createAsyncThunk(
  'admin/fetchGlobalState',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const requestArr = [getCollection(), getCategories(), getTags()];

      const [collections, categories, tags] = await Promise.all(requestArr);
      dispatch(setCollections(collections));
      dispatch(setCategories(categories));
      dispatch(setTags(tags));

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
