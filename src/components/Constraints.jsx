
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import _ from "lodash";
import CourseListAccordion from "./CourseListAccordion";

const Constraints = ({ selectedCourses, slots }) => {
  const [prioritized, setPrioritized] = useState([]);
  const [prioritizedTeachers, setPrioritizedTeachers] = useState({});
  const [offdays, setOffdays] = useState([]);
  const [firstLast, setFirstLast] = useState([0, 0]);
  const [gaps, setGaps] = useState([0, 0]);

   const displaySelectedCourses = () => {
    return selectedCourses.map((course) => ({
      title: `${course.instructor} - ${course.title}`,
      subText: `${course.erp} | ${course.days?.join(" & ")} | ${
        course.slot
      } | ${course.instructor} | ${course.title}  `,
    }));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOffdays(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box>
    

      <CourseListAccordion
        title="Selected Courses"
        data={displaySelectedCourses()}
        actions={[
          {
            callback: (i) =>
              prioritized.filter((p) => p.erp === i.erp).length === 0 &&
              setPrioritized((prevState) => [...prevState, i]),
            title: "Prioritize",
          },
          {
            callback: (i) =>
              setPrioritizedTeachers((prevState) => ({
                ...prevState,
                [i.title]: i.instructor,
              })),
            title: "Prioritize Teacher",
          },
        ]}
      />

      <CourseListAccordion
        title="Prioritized Courses"
        data={prioritized.map((course) => ({
          mainText: `${course.instructor} - ${course.title}`,
          subText: `${course.erp} | ${course.days?.join(" & ")} | ${
            course.slot
          }`,
        }))}
        actions={[
          {
            callback: ({ erp }) =>
              setPrioritized((prevState) =>
                prevState.filter((i) => i.erp !== erp)
              ),
            title: "Remove",
          },
        ]}
      />

      <CourseListAccordion
        title="Prioritized Teachers"
        data={Object.keys(prioritizedTeachers).map((courseName) => ({
          mainText: prioritizedTeachers[courseName],
          subText: courseName,
        }))}
        actions={[
          {
            callback: ({ subText: courseName }) =>
              setPrioritizedTeachers((prevState) =>
                _.omit(prevState, courseName)
              ),
            title: "Remove",
          },
        ]}
      />

      <Box>
        <Typography>Off days</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Off days</InputLabel>
          <Select
            multiple
            value={offdays}
            onChange={handleChange}
            input={<OutlinedInput label="Off days" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={offdays.indexOf(day) > -1} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography>First & last class</Typography>
        <FormControl>
          <InputLabel>First Class</InputLabel>
          <Select
            value={firstLast[0]}
            label="First Class"
            onChange={(e) => setFirstLast((prev) => [e.target.value, prev[1]])}
          >
            {slots.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.timing}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Last Class</InputLabel>
          <Select
            value={firstLast[1]}
            label="Last Class"
            onChange={(e) => setFirstLast((prev) => [prev[0], e.target.value])}
          >
            {slots.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.timing}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography>Min & max gap length (in terms of slots)</Typography>
        <FormControl>
          <InputLabel>Minimum</InputLabel>
          <Select
            value={gaps[0]}
            label="Minimum"
            onChange={(e) => setGaps((prev) => [e.target.value, prev[1]])}
          >
            {slots.map((i, j) => (
              <MenuItem key={i.id} value={j}>
                {j}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Maximum</InputLabel>
          <Select
            value={gaps[1]}
            label="Maximum"
            onChange={(e) => setGaps((prev) => [prev[0], e.target.value])}
          >
            {slots.map((i, j) => (
              <MenuItem key={i.id} value={j}>
                {j}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Constraints;

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
