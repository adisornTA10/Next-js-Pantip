// store/scrollSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState: { scrollPosition: 0 },
  reducers: {
    scrollLeft: (state) => {
      state.scrollPosition -= 200; // ระยะที่เลื่อนซ้าย
    },
    scrollRight: (state) => {
      state.scrollPosition += 200; // ระยะที่เลื่อนขวา
    },
  },
});

export const { scrollLeft, scrollRight } = scrollSlice.actions;

export default scrollSlice.reducer;
