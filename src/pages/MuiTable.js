// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@mui/material";
// import { useEffect, useState } from "react";

// const Muitable = ({ rows }) => {
//   // Receive rows as a prop
//   const columns = [
//     // { id: 'id', name: 'ID' },
//     { id: "slot", name: "Slot" },
//     { id: "days", name: "Days" },
//     { id: "title", name: "Title" },
//     { id: "program", name: "Program" },
//     { id: "room", name: "Room" },
//     { id: "erp", name: "ERP" },
//     { id: "instructor", name: "Instructor" },
//   ];
//   // ... (other components)
//   const handlechangepage = (event, newpage) => {
//     pagechange(newpage);
//   };
//   const handleRowsPerPage = (event) => {
//     rowperpagechange(+event.target.value);
//     pagechange(0);
//   };
//   //const [rows, rowchange] = useState([]);
//   const [page, pagechange] = useState(0);
//   const [rowperpage, rowperpagechange] = useState(5);
//   useEffect(() => {
//     // No need to fetch data here, it's received as a prop
//   }, [rows]);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <Paper sx={{ width: "90%", marginLeft: "5%" }}>
//         <TableContainer sx={{ maxHeight: 450 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     style={{ backgroundColor: "black", color: "white" }}
//                     key={column.id}
//                   >
//                     {column.name}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows &&
//                 rows
//                   .slice(page * rowperpage, page * rowperpage + rowperpage)
//                   .map((row, i) => {
//                     return (
//                       <TableRow key={i}>
//                         {columns &&
//                           columns.map((column, i) => {
//                             let value = row[column.id];
//                             return <TableCell key={value}>{value}</TableCell>;
//                           })}
//                       </TableRow>
//                     );
//                   })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           rowsPerPage={rowperpage}
//           page={page}
//           count={rows.length}
//           component="div"
//           onPageChange={handlechangepage}
//           onRowsPerPageChange={handleRowsPerPage}
//         ></TablePagination>
//       </Paper>
//     </div>
//   );
// };

// export default Muitable;

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const Muitable = ({ rows }) => {
  const columns = [
    { id: "slot", name: "Slot" },
    { id: "days", name: "Days" },
    { id: "title", name: "Title" },
    { id: "program", name: "Program" },
    { id: "room", name: "Room" },
    { id: "erp", name: "ERP" },
    { id: "instructor", name: "Instructor" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  useEffect(() => {
    // No need to fetch data here, it's received as a prop
  }, [rows]);

  return (
    <div style={{ textAlign: "center" }}>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ minWidth: 800, maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={column.id}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column, i) => {
                            let value = row[column.id];
                            return <TableCell key={value}>{value}</TableCell>;
                          })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={rows.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default Muitable;



// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
// import { useEffect, useState } from 'react';

// const Muitable = ({ rows }) => {
//   const columns = [
//     { id: 'slot', name: 'Slot' },
//     { id: 'days', name: 'Days' },
//     { id: 'title', name: 'Title' },
//     { id: 'program', name: 'Program' },
//     { id: 'room', name: 'Room' },
//     { id: 'erp', name: 'ERP' },
//     { id: 'instructor', name: 'Instructor' }
//   ];

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     setPage(0); // Reset page when new rows are received
//   }, [rows]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const totalPages = Math.ceil(rows.length / rowsPerPage);
//   const displayPages = 10; // Limit to 10 pages

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <Paper sx={{ width: '90%', marginLeft: '5%' }}>
//         <TableContainer sx={{ maxHeight: 450 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>
//                     {column.name}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows &&
//                 rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
//                   <TableRow key={i}>
//                     {columns.map((column, j) => (
//                       <TableCell key={j}>{row[column.id]}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           count={rows.length}
//           component="div"
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           totalPages={displayPages} // Pass the total number of displayable pages
//         />
//       </Paper>
//     </div>
//   );
// };

// export default Muitable;
