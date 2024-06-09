/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { CardBody, Typography, IconButton, Tooltip, Progress } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const Table = ({ data, onEdit, onPause }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Maximum amount',
        accessor: 'maximum_amount',
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
      },
      {
        Header: 'Edit',
        accessor: 'edit',
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
        accessor: 'Pause',
        Cell: ({ row }) => (
          <Tooltip content="Pause">
            <IconButton className="border" variant="text" onClick={() => onPause(row.original)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </IconButton>
          </Tooltip>
        ),
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ row }) => (
          <Tooltip content="Delete Pet">
            <IconButton variant="text">
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [data,onEdit, onPause]
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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

export default Table;
