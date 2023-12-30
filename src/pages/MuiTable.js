import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";

const Muitable = ({ rows }) => {
  const columns = [
    { id: "slot", name: "Slot" },
    { id: "days", name: "Days" },
    { id: "title", name: "Title" },
    { id: "program", name: "Program" },
    { id: "room", name: "Room" },
    { id: "erp", name: "ERP" },
    { id: "instructor", name: "Instructor" },
    { id: "actions", name: "Actions" }, // New column for buttons
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
  const [selectedERPs, setSelectedERPs] = useState([]); // List to store selected ERPs

  useEffect(() => {
    // No need to fetch data here, it's received as a prop
  }, [rows]);

  const handleAddClass = (erp) => {
    // Check if the ERP is already selected
    const isAlreadySelected = selectedERPs.includes(erp);

    // If it's already selected, remove it; otherwise, add it
    if (isAlreadySelected) {
      setSelectedERPs((prevERPs) =>
        prevERPs.filter((selectedERP) => selectedERP !== erp)
      );
    } else {
      setSelectedERPs((prevERPs) => [...prevERPs, erp]);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ width: "100%", maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      borderRight:
                        index < columns.length - 1 ? "1px solid white" : "none", // Add right border
                    }}
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
                  .map((row, i) => (
                    <TableRow key={i}>
                      {columns.map((column, index) => (
                        <TableCell
                          key={column.id}
                          style={{
                            borderRight:
                              index < columns.length - 1
                                ? "1px solid #ddd"
                                : "none",
                          }} // Add right border
                        >
                          {column.id === "actions" ? (
                            <Button onClick={() => handleAddClass(row.erp)}>
                              {selectedERPs.includes(row.erp)
                                ? "Remove Class"
                                : "Add Class"}
                            </Button>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
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
      <div>
        <h3>Selected Courses:</h3>
        <ul>
          {selectedERPs.map((erp, index) => (
            <li key={index}>{erp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Muitable;
