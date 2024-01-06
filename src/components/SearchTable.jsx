// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Button,
// } from "@mui/material";
// import Constraints from "./Constraints"; // Import the Constraints component

// const SearchTable = ({ searchResults, selectedCourses, setSelectedCourses, handlePageChange }) => {
//   const { results: rows, totalResults, pageSize, currentPage: page } = searchResults

//   const columns = [
//     { id: "slot", name: "Slot" },
//     { id: "days", name: "Days" },
//     { id: "title", name: "Title" },
//     { id: "program", name: "Program" },
//     { id: "room", name: "Room" },
//     { id: "erp", name: "ERP" },
//     { id: "instructor", name: "Instructor" },
//     { id: "actions", name: "Actions" }, // New column for buttons
//   ];

//   const handleAddClass = (course) => {
//     const isAlreadySelected = selectedCourses.some(
//       (selectedCourse) => selectedCourse.erp === course.erp
//     );

//     if (isAlreadySelected) {
//       setSelectedCourses((prevCourses) =>
//         prevCourses.filter(
//           (selectedCourse) => selectedCourse.erp !== course.erp
//         )
//       );
//     } else {
//       setSelectedCourses((prevCourses) => [...prevCourses, course]);
//     }

//   };


//   return (
//     <div style={{ textAlign: "center" }}>
//       <Paper sx={{ width: "100%", overflowX: "auto" }}>
//         <TableContainer sx={{ width: "100%", maxHeight: 450, mt: 1 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column, index) => (
//                   <TableCell
//                     style={{
//                       backgroundColor: "#700F1A",
//                       color: "white",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       borderRight:
//                         index < columns.length - 1 ? "1px solid white" : "none", // Add right border
//                     }}
//                     key={column.id}
//                   >
//                     {column.name}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row, i) => (
//                 <TableRow key={i}>
//                   {columns.map((column, index) => (
//                     <TableCell
//                       key={column.id}
//                       style={{
//                         borderRight:
//                           index < columns.length - 1
//                             ? "1px solid #ddd"
//                             : "none",
//                       }} // Add right border
//                     >
//                       {column.id === "actions" ? (
//                         <Button onClick={() => handleAddClass(row)}>
//                           {selectedCourses.some(
//                             (selectedCourse) =>
//                               selectedCourse.id === row.id
//                           )
//                             ? "Remove Class"
//                             : "Add Class"}
//                         </Button>
//                       ) : (
//                         row[column.id]
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPage={pageSize}
//           page={page - 1}
//           count={totalResults}
//           component="div"
//           rowsPerPageOptions={false}
//           onPageChange={(e, p) => handlePageChange(p + 1)}
//         ></TablePagination>
//       </Paper>
//     </div>
//   );
// };

// export default SearchTable;

// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Button,
// } from "@mui/material";
// import Constraints from "./Constraints";
// import { useSelector } from "react-redux";

// const SearchTable = ({
//   searchResults,
//   selectedCourses,
//   setSelectedCourses,
//   handlePageChange,
// }) => {
//   const {
//     results: rows,
//     totalResults,
//     pageSize,
//     currentPage: page,
//   } = searchResults;
//   const slotsData = useSelector((state) => state.app.slots); // Get slots data from Redux store

//   const columns = [
//     { id: "slot", name: "Slot" },
//     { id: "timing", name: "Timing" },
//     { id: "days", name: "Days" },
//     { id: "title", name: "Title" },
//     { id: "program", name: "Program" },
//     { id: "room", name: "Room" },
//     { id: "erp", name: "ERP" },
//     { id: "instructor", name: "Instructor" },
//     // New column for timing
//     { id: "actions", name: "Actions" },
//   ];

//   const handleAddClass = (course) => {
//     const isAlreadySelected = selectedCourses.some(
//       (selectedCourse) => selectedCourse.erp === course.erp
//     );

//     if (isAlreadySelected) {
//       setSelectedCourses((prevCourses) =>
//         prevCourses.filter(
//           (selectedCourse) => selectedCourse.erp !== course.erp
//         )
//       );
//     } else {
//       setSelectedCourses((prevCourses) => [...prevCourses, course]);
//     }
//   };

//    return (
//      <div style={{ textAlign: "center" }}>
//        <Paper sx={{ width: "100%", overflowX: "auto" }}>
//          <TableContainer sx={{ width: "100%", maxHeight: 450, mt: 1 }}>
//            <Table stickyHeader>
//              <TableHead>
//                <TableRow>
//                  {columns.map((column, index) => (
//                    <TableCell
//                      style={{
//                        backgroundColor: "#700F1A",
//                        color: "white",
//                        position: "sticky",
//                        top: 0,
//                        zIndex: 1,
//                        borderRight:
//                          index < columns.length - 1
//                            ? "1px solid white"
//                            : "none",
//                      }}
//                      key={column.id}
//                    >
//                      {column.name}
//                    </TableCell>
//                  ))}
//                </TableRow>
//              </TableHead>
//              <TableBody>
//                {rows.map((row, i) => (
//                  <TableRow key={i}>
//                    {columns.map((column, index) => (
//                      <TableCell
//                        key={column.id}
//                        style={{
//                          borderRight:
//                            index < columns.length - 1
//                              ? "1px solid #ddd"
//                              : "none",
//                        }}
//                      >
//                        {column.id === "actions" ? (
//                          <Button onClick={() => handleAddClass(row)}>
//                            {selectedCourses.some(
//                              (selectedCourse) => selectedCourse.id === row.id
//                            )
//                              ? "Remove Class"
//                              : "Add Class"}
//                          </Button>
//                        ) : column.id === "timing" ? (
//                          // Fill in timing using slotsData
//                          `${
//                            slotsData.find((slot) => slot.id === row.slot)
//                              ?.timing
//                          } - ${
//                            slotsData.find((slot) => slot.id === row.slot + 1)
//                              ?.timing
//                          }`
//                        ) : (
//                          row[column.id]
//                        )}
//                      </TableCell>
//                    ))}
//                  </TableRow>
//                ))}
//              </TableBody>
//            </Table>
//          </TableContainer>
//          <TablePagination
//            rowsPerPage={pageSize}
//            page={page - 1}
//            count={totalResults}
//            component="div"
//            rowsPerPageOptions={false}
//            onPageChange={(e, p) => handlePageChange(p + 1)}
//          ></TablePagination>
//        </Paper>
//      </div>
//    );
// };

// export default SearchTable;

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
  Checkbox,
} from "@mui/material";
import Constraints from "./Constraints";
import { useSelector } from "react-redux";

const SearchTable = ({
  searchResults,
  selectedCourses,
  setSelectedCourses,
  handlePageChange,
}) => {
  const {
    results: rows,
    totalResults,
    pageSize,
    currentPage: page,
  } = searchResults;
  const slotsData = useSelector((state) => state.app.slots); // Get slots data from Redux store

  const handleToggleClass = (course) => {
    const isSelected = selectedCourses.some(
      (selectedCourse) => selectedCourse.erp === course.erp
    );

    if (isSelected) {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter(
          (selectedCourse) => selectedCourse.erp !== course.erp
        )
      );
    } else {
      setSelectedCourses((prevCourses) => [...prevCourses, course]);
    }
  };

  const isSelected = (course) =>
    selectedCourses.some((selectedCourse) => selectedCourse.erp === course.erp);

  return (
    <div style={{ textAlign: "center" }}>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ width: "100%", maxHeight: 450, mt: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Select
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Slot
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Timing
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Days
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Title
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Program
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Room
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  ERP
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#700F1A", color: "white" }}
                >
                  Instructor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleToggleClass(row)}
                    />
                  </TableCell>
                  <TableCell>{row.slot}</TableCell>
                  <TableCell>{`${
                    slotsData.find((slot) => slot.id === row.slot)?.timing
                  } - ${
                    slotsData.find((slot) => slot.id === row.slot + 1)?.timing
                  }`}</TableCell>
                  <TableCell>{row.days}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.program}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>{row.erp}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPage={pageSize}
          page={page - 1}
          count={totalResults}
          component="div"
          rowsPerPageOptions={false}
          onPageChange={(e, p) => handlePageChange(p + 1)}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default SearchTable;
