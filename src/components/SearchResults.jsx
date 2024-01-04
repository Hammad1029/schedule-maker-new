// import React, { useEffect, useState } from "react";
// import { Paper } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';

// const SearchResults = ({ data, handlePageChange, selectCourses }) => {
//   const columns = [
//     { field: 'slot', headerName: 'Slot' },
//     { field: 'days', headerName: 'Days' },
//     { field: 'title', headerName: 'Title' },
//     { field: "program", headerName: "Program" },
//     { field: "room", headerName: "Room" },
//     { field: "erp", headerName: "ERP" },
//     { field: "instructor", headerName: "Instructor" },
//     { field: "actions", headerName: "Actions" }
//   ]

//   const { results, currentPage, totalResults, totalPages, hasNextPage, pageSize, loading } = data

//   return (
//     <Paper>
//       <DataGrid
//         rows={results}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: currentPage, pageSize },
//           },
//         }}
//         onRowSelectionModelChange={selectCourses}
//         loading={loading}
//         paginationMode="server"
//         onPaginationModelChange={(e) => handlePageChange(e.page)}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         rowCount={totalResults}
//       />
//     </Paper>
//   );
// };

// export default SearchResults;


// import React, { useEffect, useState } from "react";
// import { Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// const SearchResults = ({ data, handlePageChange, selectCourses }) => {
//   const columns = [
//     { field: "slot", headerName: "Slot" },
//     { field: "days", headerName: "Days" },
//     { field: "title", headerName: "Title" },
//     { field: "program", headerName: "Program" },
//     { field: "room", headerName: "Room" },
//     { field: "erp", headerName: "ERP" },
//     { field: "instructor", headerName: "Instructor" },
//     { field: "actions", headerName: "Actions" },
//   ];

//   const {
//     results,
//     currentPage,
//     totalResults,
//     totalPages,
//     hasNextPage,
//     pageSize,
//     loading,
//   } = data;
//   const [page, setPage] = useState(currentPage - 1);
//   const [rowPerPage, setRowPerPage] = useState(5);
//   const [selectedCourses, setSelectedCourses] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend when page or rowPerPage changes
//     // Implement your API call here
//     // You can use the handlePageChange function to update the server-side pagination
//   }, [page, rowPerPage]);

//   return (
//     <Paper>
//       <DataGrid
//         rows={results}
//         columns={columns}
//         pagination
//         rowsPerPageOptions={[5, 10, 25]}
//         rowsPerPage={rowPerPage}
//         page={page}
//         rowCount={totalResults}
//         autoHeight
//         onPageChange={(newPage) => {
//           setPage(newPage - 1);
//           handlePageChange(newPage);
//         }}
//         onPageSizeChange={(newPageSize) => setRowPerPage(newPageSize)}
//         checkboxSelection
//         onSelectionModelChange={(newSelection) => {
//           const selectedCourses = results.filter((course) =>
//             newSelection.includes(course.id)
//           );
//           setSelectedCourses(selectedCourses);
//           selectCourses(selectedCourses);
//         }}
//         loading={loading}
//       />
//     </Paper>
//   );
// };

// export default SearchResults;




import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const SearchResults = ({ data, handlePageChange, selectCourses }) => {
  const columns = [
    { field: "slot", headerName: "Slot" },
    { field: "days", headerName: "Days" },
    { field: "title", headerName: "Title", },
    { field: "program", headerName: "Program" },
    { field: "room", headerName: "Room" },
    { field: "erp", headerName: "ERP" },
    { field: "instructor", headerName: "Instructor", width: "0.05em" },
    { field: "actions", headerName: "Actions" },
  ];

  const {
    results,
    currentPage,
    totalResults,
    totalPages,
    hasNextPage,
    pageSize,
    loading,
  } = data;
  const [page, setPage] = useState(currentPage - 1); // DataGrid uses 0-based indexing
  const [rowPerPage, setRowPerPage] = useState(5);
  const [selectedCourses, setSelectedCourses] = useState([]);
  console.log(
    currentPage,
    totalResults,
    totalPages,
    hasNextPage,
    pageSize,
    loading
  );

  useEffect(() => {
  }, [page, rowPerPage]);

  return (
    <Paper>
      <DataGrid
        // sx={{ width: "100%", maxHeight: 450 }}
        rows={results}
        columns={columns}
        pagination
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowPerPage}
        page={page}
        rowCount={totalResults}
        onPageChange={(newPage) => {
          setPage(newPage - 1);
          handlePageChange(newPage); // Call your server-side pagination function
        }}
        onPageSizeChange={(newPageSize) => setRowPerPage(newPageSize)}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          const selectedCourses = results.filter((course) =>
            newSelection.includes(course.id)
          );
          setSelectedCourses(selectedCourses);
          selectCourses(selectedCourses);
        }}
        loading={loading}
      />
    </Paper>
  );
};

export default SearchResults;



