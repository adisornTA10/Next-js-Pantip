import { createSlice } from '@reduxjs/toolkit';

type Highlight = {
  title: string;
  imageUrl: string;
  link: string;
  author: string;
  date: string;
  comments: number;
};

type HighlightState = {
  highlights: Highlight[];
  visibleCount: number;
};

const initialState: HighlightState = {
  highlights: [],
  visibleCount: 5,
};

const pantippickSlice = createSlice({
  name: 'pantippick',
  initialState,
  reducers: {
    setHighlights: (state, action) => {
      state.highlights = action.payload;
    },
    showMore: (state) => {
      state.visibleCount += 5;
    },
  },
});

export const { setHighlights, showMore } = pantippickSlice.actions;

export default pantippickSlice.reducer;
