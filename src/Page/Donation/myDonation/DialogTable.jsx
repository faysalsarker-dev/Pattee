/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { CardBody, Typography, IconButton, Tooltip, Progress } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DialogTable = ({ data ,loading}) => {
  const columns = useMemo(
    () => [
        {
          Header: 'Name',
          accessor: 'name',
        },
      {
        Header: 'Transaction id',
        accessor: 'transactionId'
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },

     
     
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  if (loading) {
    return (
      <CardBody className="overflow-scroll px-0 -mt-10">
        <table className=" w-full min-w-max table-auto text-left -mt-10">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              {columns.map((column, idx) => (
                <th key={idx} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    <Skeleton width={100} />
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  {columns.map((column, idx) => (
                    <td key={idx} className="px-4 py-2 border-b border-gray-200">
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </CardBody>
    );
  }

  return (
    <CardBody className="overflow-y-scroll px-0">
      <table {...getTableProps()} className="mt-4 w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white">
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {column.render('Header')}
                  </Typography>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border-b border-gray-200">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </CardBody>
  );
};

export default DialogTable;
