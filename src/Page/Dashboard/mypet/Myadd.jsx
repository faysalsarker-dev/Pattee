// /* eslint-disable react/prop-types */
// import { Card, CardHeader, CardBody, CardFooter, Button, Typography, Avatar, Chip, IconButton, Tooltip } from '@material-tailwind/react';
// // import {  PencilIcon ,DeleteIcon} from '@heroicons/react';
// import { useMemo } from 'react';
// import { useTable, useSortBy } from 'react-table';

// const MyTable = ({ data }) => {
//     // const columns = useMemo(() => [
//     //     {
//     //         Header: 'Serial Number',
//     //         accessor: (row, index) => index + 1,
//     //     },
//     //     {
//     //         Header: 'Pet Image',
//     //         accessor: 'image',
//     //         Cell: ({ cell }) => <img src={cell.value} alt="Pet" className="w-16 h-16 object-cover" />,
//     //     },
//     //     {
//     //         Header: 'Name',
//     //         accessor: 'name',
//     //     },
//     //     {
//     //         Header: 'Age',
//     //         accessor: 'age',
//     //     },
//     //     {
//     //         Header: 'Pet Category',
//     //         accessor: 'category',
//     //     },
//     //     {
//     //         Header: 'Adoption Status',
//     //         accessor: 'adopted',
//     //     },
//     //     {
//     //         Header: 'Edit',
//     //         accessor: '',
//     //         Cell: ({ row }) => (
                
//     //                 <button>Edit</button>
                  
                
//     //         ),
//     //     },
//     //     {
//     //         Header: 'Delete',
//     //         accessor: '',
//     //         Cell: ({ row }) => (
                
               
//     //                 <button>Delete</button>
             
//     //         ),
//     //     },
//     // ], []);


//     const columns = useMemo(() => [
//         {
//             Header: 'Serial Number',
//             accessor: (row, index) => index + 1,
//         },
//         {
//             Header: 'Pet Image',
//             accessor: 'image',
//             Cell: ({ cell }) => <img src={cell.value} alt="Pet" className="w-16 h-16 object-cover" />,
//         },
//         {
//             Header: 'Name',
//             accessor: 'name',
//         },
//         {
//             Header: 'Age',
//             accessor: 'age',
//         },
//         {
//             Header: 'Pet Category',
//             accessor: 'category',
//         },
//         {
//             Header: 'Adoption Status',
//             accessor: 'adopted',
//         },
//         {
//             Header: 'Edit',
//             accessor: '',
//             Cell: ({ row }) => (
//                 <Tooltip content="Edit">
//                     <IconButton variant="text">
//                         {/* <PencilIcon className="h-4 w-4" /> */}
//                     </IconButton>
//                 </Tooltip>
//             ),
//         },
//         {
//             Header: 'Delete',
//             accessor: '',
//             Cell: ({ row }) => (
//                 <Tooltip content="Delete">
//                     <IconButton variant="text">
//                         {/* <DeleteIcon className="h-4 w-4" /> */}
//                     </IconButton>
//                 </Tooltip>
//             ),
//         },
//     ], []);













//     const tableInstance = useTable(
//         {
//             columns,
//             data,
//         },
//         useSortBy // Add sorting functionality
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//         state: { sortBy },
//         setSortBy,
//     } = tableInstance;

//     // Sorting function based on clicked column and direction
//     const handleSort = (columnId) => {
//         const isDesc = sortBy.some((s) => s.id === columnId && s.desc);
//         setSortBy([{ id: columnId, desc: !isDesc }]);
//     };

//     return (
//         <table {...getTableProps()} className="mt-4 w-full min-w-max table-auto text-left">
//             <thead>
//                 {headerGroups && headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                         {headerGroup.headers.map((column) => (
//                             <th
//                                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                                 key={column.id}
//                                 className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                                 onClick={() => handleSort(column.id)}
//                             >
//                                 {column.render('Header')}
//                                 <span>
//                                     {column.isSorted
//                                         ? column.isSortedDesc
//                                             ? ' 🔽'
//                                             : ' 🔼'
//                                         : ''}
//                                 </span>
//                             </th>
//                         ))}
//                     </tr>
//                 ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                     prepareRow(row);
//                     return (
//                         <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
//                             {row.cells.map((cell) => (
//                                 <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border-b border-gray-200">
//                                     {cell.render('Cell')}
//                                 </td>
//                             ))}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// };

// export default MyTable;



/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import {
  Card,

  CardBody,
  CardFooter,
  Button,
  Typography,

  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { PencilIcon} from '@heroicons/react/24/solid';

const MyTable = ({ data }) => {
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
          <img src={cell.value} alt="Pet" className="w-16 h-16 object-cover rounded-full" />
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
      },
      {
        Header: 'Edit',
        accessor: '',
        Cell: ({ row }) => (
          <Tooltip content="Edit Pet">
            <IconButton variant="text">
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
            <IconButton variant="text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy // Add sorting functionality
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

  // Sorting function based on clicked column and direction
  const handleSort = (columnId) => {
    const isDesc = sortBy.some((s) => s.id === columnId && s.desc);
    setSortBy([{ id: columnId, desc: !isDesc }]);
  };

  return (
  
      <CardBody className="overflow-y-scroll px-0 h-[100vh]">
        <table {...getTableProps()} className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
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
