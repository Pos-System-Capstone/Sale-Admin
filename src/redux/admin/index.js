import { createSlice } from '@reduxjs/toolkit';

const initialState = { collections: null, categories: null, tags: null };

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    }
  }
});

export const { setCollections, setCategories, setTags } = adminSlice.actions;
export default adminSlice.reducer;
