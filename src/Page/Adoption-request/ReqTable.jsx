/* eslint-disable react/prop-types */
import {  useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import {
  
  CardBody,
  Typography,
  IconButton,
  Tooltip,
  
} from '@material-tailwind/react';

import Skeleton from 'react-loading-skeleton';

const ReqTable = ({ data,onAccept, onReject,isLoading }) => {







  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'pet_image',
        Cell: ({ cell }) => (
          <img src={cell?.value} alt="Pet" className="w-16 h-16 object-cover rounded-full" />
        ),
      },
      {
        Header: 'Pet name',
        accessor: 'pet_name',
      },
      {
        Header: 'Name',
        accessor: 'user_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'number',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      
      {
        Header: 'Accept',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Accept">
            <IconButton variant="text" onClick={() => onAccept(row.original)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            </IconButton>
          </Tooltip>
        ),
      },
      {
        Header: 'Reject',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Reject">
            <IconButton className='border' variant="text" onClick={()=>onReject(row.original)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


            </IconButton>
          </Tooltip>
        ),
      }

    ],
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data,onAccept, onReject]
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
    <CardBody className="overflow-y-scroll px-0 -mt-5">
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
              <tr {...row.getRowProps()} key={row.id} className={`hover:bg-gray-100 `} >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id} 
                  
                  className={`px-4 py-2 border-b-2 ${
                    row.original.status === 'accept' ? 'border-light-green-500' :
                    row.original.status === 'reject' ? 'border-red-500' : ''
                  } `}
                  
                  >
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

export default ReqTable;
