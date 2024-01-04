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

const Muitable = ({ rows, selectCourses }) => {
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
  const [slots, setSlots] = useState(slotsData);

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const [selectedCourses, setSelectedCourses] = useState([]);
  useEffect(() => {
    // No need to fetch data here, it's received as a prop
//selectCourses(selectedCourses);

  }, [rows]);


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
                            <Button onClick={() => handleAddClass(row)}>
                              {selectedCourses.some(
                                (selectedCourse) =>
                                  selectedCourse.erp === row.erp
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
          {/* {selectedERPs.map((erp, index) => (
            <li key={index}>{erp}</li>
          ))} */}
          {selectedCourses.map((course, index) => (
            <li key={index}>
              {course.instructor} - {course.title} | {course.erp} |{" "}
              {course.days?.join(" & ")} | {course.slot}
            </li>
          ))}
          
        </ul>

        {/* {selectedCourses && (
          <Constraints slots={slotsData} selectedCourses={selectedCourses} />
        )} */}
      </div>
    </div>
  );
};

const slotsData = [
  {
    id: 65,
    timing: "08:30:00",
  },
  {
    id: 66,
    timing: "10:00:00",
  },
  {
    id: 67,
    timing: "11:30:00",
  },
  {
    id: 68,
    timing: "13:00:00",
  },
  {
    id: 69,
    timing: "14:30:00",
  },
  {
    id: 70,
    timing: "16:00:00",
  },
  {
    id: 71,
    timing: "17:30:00",
  },
  {
    id: 72,
    timing: "19:00:00",
  },
];

export default Muitable;
