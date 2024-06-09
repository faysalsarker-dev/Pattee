/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { CardBody, Typography,  Chip, Tooltip, IconButton } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Skeleton from 'react-loading-skeleton';


const PetTable = ({ data, onEdit ,onDelete,onStatus,isLoading}) => {
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
        Header: 'Status',
        accessor: 'adopted',
        Cell: ({ cell,row }) => (
          <Tooltip content="Click to Change the Status">
            <div className="w-max" onClick={() => onStatus(row.original)}>
              <Chip
                variant="ghost"
                size="sm"
                value={cell.value ? 'Adopted' : 'Not Adopted'}
                color={cell.value ? "green" : "blue-gray"}
              />
            </div>
          </Tooltip>
        ),
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
    [onEdit,onDelete,onStatus]
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

export default PetTable;
