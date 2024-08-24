// import { createSlice } from '@reduxjs/toolkit';

// type MenuState = {
//   activeMenu: string;
// };

// const initialState: MenuState = {
//   activeMenu: 'home',
// };

// const menuSlice = createSlice({
//   name: 'menu',
//   initialState,
//   reducers: {
//     setActiveMenu: (state, action) => {
//       state.activeMenu = action.payload;
//     },
//   },
// });

// export const { setActiveMenu } = menuSlice.actions;
// export default menuSlice.reducer;

// store/menuSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type MenuState = {
  activeMenus: { [key: string]: boolean }; // ใช้ object เพื่อเก็บสถานะของหลายเมนู
};

const initialState: MenuState = {
  activeMenus: {
    home: true, // ตั้งค่าเริ่มต้นให้ 'home' ถูก active
    community: false,
    // เพิ่มเมนูอื่นๆ ได้ที่นี่
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      const menuName = action.payload;
      for (const menu in state.activeMenus) {
        state.activeMenus[menu] = false; // ปิด active ทุกเมนู
      }
      state.activeMenus[menuName] = true; // เปิด active เฉพาะเมนูที่ถูกคลิก
    },
  },
});

export const { setActiveMenu } = menuSlice.actions;
export default menuSlice.reducer;
