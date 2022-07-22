import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'system',
  initialState: 2,
  reducers: {
    toReportSystem() {
      return 2;
    },
    toPromotionSystem() {
      return 3;
    }
  }
});

const { actions, reducer } = slice;
export const { toPromotionSystem, toReportSystem } = actions;

export default reducer;
