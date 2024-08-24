import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './menuSlice';
import pantippickReducer from './pantippick';
import scrollReducer from './scrollSlice';
import sidebarReducer from './sidebarSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    menu: menuReducer,
    scroll: scrollReducer,
    pantippick: pantippickReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
