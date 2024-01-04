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
import Constraints from "./Constraints"; // Import the Constraints component

const Muitable = ({ searchResults, selectCourses, handlePageChange }) => {
  const { results: rows, totalPages, pageSize, currentPage: page } = searchResults

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

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleAddClass = (course) => {
    const isAlreadySelected = selectedCourses.some(
      (selectedCourse) => selectedCourse.erp === course.erp
    );

    if (isAlreadySelected) {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter(
          (selectedCourse) => selectedCourse.erp !== course.erp
        )
      );
    } else {
      setSelectedCourses((prevCourses) => [...prevCourses, course]);
    }

    // Call the selectCourses prop with the updated selectedCourses
    const selectedCourseIds = selectedCourses.map((selectedCourse) => selectedCourse.id);
    selectCourses(selectedCourseIds);
    console.log(selectedCourses)
  };


  return (
    <div style={{ textAlign: "center" }}>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ width: "100%", maxHeight: 450, mt: 1 }}>
          <Table stickyHeader>
            <TableHead onClick={() => console.log(rows)}>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    style={{
                      backgroundColor: "#700F1A",
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
              {rows.map((row, i) => (
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
                        <Button onClick={() => handleAddClass(row)}>
                          {selectedCourses.some(
                            (selectedCourse) =>
                              selectedCourse.id === row.id
                          )
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
          rowsPerPage={pageSize}
          page={page-1}
          count={totalPages}
          component="div"
          onPageChange={(e, p) => handlePageChange(p+1)}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default Muitable;
