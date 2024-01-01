import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const SearchResults = ({ data, handlePageChange, selectCourses }) => {
  const columns = [
    { field: 'slot', headerName: 'Slot' },
    { field: 'days', headerName: 'Days' },
    { field: 'title', headerName: 'Title' },
    { field: "program", headerName: "Program" },
    { field: "room", headerName: "Room" },
    { field: "erp", headerName: "ERP" },
    { field: "instructor", headerName: "Instructor" },
    { field: "actions", headerName: "Actions" }
  ]

  const { results, currentPage, totalResults, totalPages, hasNextPage, pageSize, loading } = data


  return (
    <Paper>
      <DataGrid
        rows={results}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: currentPage, pageSize },
          },
        }}
        onRowSelectionModelChange={selectCourses}
        loading={loading}
        paginationMode="server"
        onPaginationModelChange={(e) => handlePageChange(e.page)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowCount={totalResults}
      />
    </Paper>
  );
};

export default SearchResults;
