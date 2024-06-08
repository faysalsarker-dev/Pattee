/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import {
  
  CardBody,
  Typography,
  IconButton,
  Tooltip,
  Chip
} from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const MyTable = ({ data,onEdit, onDelete }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Serial',
        accessor: (row, index) => index + 1,
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ cell }) => (
          <img src={cell?.value} alt="Pet" className="w-16 h-16 object-cover rounded-full" />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Adoption Status',
        accessor: 'adopted',
        Cell: ({ cell }) => (
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={cell.value ? "True" : "false"}
              color={cell.value ? "green" : "blue-gray"}
            />
          </div>
        ),
      },
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
        Header: 'Adopt',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Adopt">
            <IconButton className='border' variant="text">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

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
    
    [onEdit, onDelete]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy 
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
    setSortBy,
  } = tableInstance;

  const handleSort = (columnId) => {
    const isDesc = sortBy.some((s) => s.id === columnId && s.desc);
    setSortBy([{ id: columnId, desc: !isDesc }]);
  };

  return (
    <CardBody className="overflow-y-scroll px-0 ">
      <table {...getTableProps()} className="mt-4 w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column,idx) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={idx}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={() => handleSort(column.id)}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
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

export default MyTable;
