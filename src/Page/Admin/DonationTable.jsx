/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { CardBody, Typography,  Tooltip, IconButton, Progress } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Skeleton from 'react-loading-skeleton';


const DonationTable = ({ data,onEdit,onDelete,isLoading,onPause}) => {
  const columns = useMemo(
    () => [
        {
            Header: 'image',
            accessor: 'image',
            Cell: ({ cell }) => (
                <img src={cell?.value} alt="users" className="w-14 h-14 object-cover rounded-full" />
              ),
          },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Donation progress',
        accessor: 'donation_amount',
        Cell: ({ row }) => {
          const progress = (row.original.donation_amount / row.original.maximum_amount) * 100;
          return (
            <Tooltip content="Edit Donation Progress">
              
                <Progress color='blue' value={progress} />
             
            </Tooltip>
          );
        },
      }
,      
      
      {
        Header: 'Edit',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Edit Pet">
            <IconButton variant="text" onClick={() => onEdit(row.original)}>
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        Header: 'Pause',
        accessor: 'pause',
        Cell: ({ row }) => (
          <Tooltip content={row.original.pause ? "Click to Resume" : "Click to Pause"}>
            <IconButton className="border" variant="text" onClick={() => onPause(row.original)}>
              {row.original.pause ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
              ) : (
              

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
              )}
            </IconButton>
          </Tooltip>
        ),
      }
      ,
      {
        Header: 'Delete',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Delete Pet">
            <IconButton variant="text" onClick={() => onDelete(row.original)}>
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        ),
      },
  
    ],
    [onEdit,onDelete,onPause]
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  if (isLoading) {
    return (
      <CardBody className="overflow-y-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
    <CardBody className="overflow-y-scroll px-0 ">
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

export default DonationTable;
