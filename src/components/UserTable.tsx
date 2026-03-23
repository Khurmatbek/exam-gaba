/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { Table, ConfigProvider, theme } from 'antd';


import { TableParams, User } from '@/types/types';
import { useUsers } from '@/hooks/useFetchUsers';
import { columns } from '@/constants/constants';
import { UserSearchForm } from '.';


const DEFAULT_PAGE_SIZE = 8;

const UsersTable: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchQuery: '',
  });
  const [searchInput, setSearchInput] = useState('');

  const { data, isFetching, isError } = useUsers(tableParams.page, tableParams.pageSize, tableParams.searchQuery);

  const total = data?.total ?? 0;
  const curPage = data ? Math.floor(data.skip / data.limit) + 1 : tableParams.page;

const handleSearch = useCallback(() => {
  setTableParams((prev) => ({ ...prev, searchQuery: searchInput, page: 1 }));
}, [searchInput]);

  return (
    <ConfigProvider
      theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#8b5cf6', colorBgContainer: '#0f172a' } }}
    >
      <div className="min-h-screen bg-[#020617] text-slate-300 font-sans">
        <div className="container">
          {/* Sidebar Space Simulation & Top Nav */}
          <div className="flex flex-col w-full max-full mx-auto md:p-1 gap-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Integrated Row */}
              <UserSearchForm
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearch={handleSearch}
              />
            </div>

            {/* Main Table Card */}
            <div className="bg-[#0f172a]  overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)]">
              <Table<User>
                rowKey="id"
                columns={columns}
                dataSource={data?.users ?? []}
                loading={isFetching}
                onChange={(pagination) => setTableParams((p) => ({ ...p, page: pagination.current ?? 1 }))}
                pagination={{
                  current: curPage,
                  pageSize: tableParams.pageSize,
                  total: total,
                  className: 'px-8 py-6 custom-pagination',
                }}
                scroll={{ x: 1800, y: 600 }}
                rowClassName="hover:bg-violet-500/[0.05] transition-all duration-300"
              />
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.5em]">
              © 2026 CENTRAL DATA TERMINAL • CLASSIFIED INFORMATION
            </div>
          </div>

          <style>{`
          .ant-table { background: transparent !important; }
          .ant-table-thead > tr > th {
            background: #0f172a !important;
            color: #475569 !important;
            border-bottom: 1px solid #1e293b !important;
            font-size: 10px !important;
            letter-spacing: 0.15em !important;
            font-weight: 900 !important;
            padding: 20px 24px !important;
            text-transform: uppercase;
          }
          .ant-table-tbody > tr > td {
            border-bottom: 1px solid #1e293b !important;
            padding: 16px 24px !important;
            color: #94a3b8 !important;
          }
          .ant-pagination-item { border: 1px solid #334155 !important; background: #020617 !important; }
          .ant-pagination-item-active { border-color: #8b5cf6 !important; background: #8b5cf6 !important; }
          .ant-pagination-item-active a { color: white !important; }
          .ant-table-cell-fix-left, .ant-table-cell-fix-right { background: #0f172a !important; z-index: 10; }
          .ant-table-cell-fix-left:after { box-shadow: inset 10px 0 8px -8px rgba(0,0,0,0.5) !important; }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #8b5cf6; }
        `}</style>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UsersTable;
