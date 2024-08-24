"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/sidebarSlice';
import { setActiveMenu } from '@/store/menuSlice';
import { MdOutlineMenu } from 'react-icons/md';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineGroups } from 'react-icons/md';

const BaseTemplate = (props: {
  leftNav?: React.ReactNode;
  searchBar?: React.ReactNode;
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}) => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const activeMenus = useSelector((state) => state.menu.activeMenus); // ดึงสถานะ active ของทุกเมนู
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white">
      <nav className="fixed top-0 w-full bg-white flex justify-between items-center p-4 shadow-sm z-50">
        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="w-10 p-1 text-3xl text-black transition-all duration-300 hover:rounded-md hover:bg-gray-200"
          >
            <MdOutlineMenu className="h-full" />
          </button>
          {props.leftNav}
        </div>

        <div className="hidden md:flex justify-center w-2/4">
          {props.searchBar}
        </div>

        <ul className="flex items-center text-black space-x-4 md:space-x-6">
          {props.rightNav}
        </ul>
      </nav>
      <div className="flex w-full h-full pt-[72px]"> {/* เพิ่ม padding-top เพื่อเลี่ยงการซ้อนทับกับ Navbar */}
        <div
          className={`transform transition-transform duration-300 ease-in-out fixed top-0 left-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } bg-white w-[237px] h-screen text-black shadow-lg z-40`}
        >
          <div className="mt-[72px] h-screen w-[237px] bg-white text-black">
            <button
              className={`mb-1 w-full justify-start bg-transparent px-6 py-3 text-left transition-colors duration-200 hover:bg-gray-100 ${
                activeMenus.home ? 'bg-gray-200' : ''
              }`}
              onClick={() => dispatch(setActiveMenu('home'))}
            >
              <div className="flex items-center gap-5">
                <IoMdHome className="text-red text-2xl" />
                <span className="text-black">หน้าหลัก</span>
              </div>
            </button>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'ml-[237px] w-[calc(100%-237px)]' : 'w-full'
          }`}
        >
          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export { BaseTemplate };
