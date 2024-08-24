'use client';

import React from 'react';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveMenu } from '@/store/menuSlice';
import { toggleSidebar } from '@/store/sidebarSlice';
import type { RootState } from '@/store/store';

const BaseTemplate = (props: {
  leftNav?: React.ReactNode;
  searchBar?: React.ReactNode;
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}) => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen); // Use RootState
  const activeMenus = useSelector((state: RootState) => state.menu.activeMenus); // Use RootState
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-white p-4 shadow-sm">
        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="w-10 p-1 text-3xl text-black transition-all duration-300 hover:rounded-md hover:bg-gray-200"
          >
            <MdOutlineMenu className="h-full" />
          </button>
          {props.leftNav}
        </div>

        <div className="hidden w-2/4 justify-center md:flex">
          {props.searchBar}
        </div>

        <ul className="flex items-center space-x-4 text-black md:space-x-6">
          {props.rightNav}
        </ul>
      </nav>

      <div className="flex size-full pt-[72px]">
        {' '}
        {/* Add padding-top to avoid overlap with Navbar */}
        <div
          className={`fixed left-0 top-0 z-40 h-screen w-[237px] bg-white shadow-lg transition-transform duration-300 ease-in-out${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
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
