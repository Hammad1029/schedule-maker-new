
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import _, { remove } from "lodash";
import CourseListAccordion from "./CourseListAccordion";
import { useSelector } from "react-redux";

const dividerMargin = 1

const Constraints = ({ makeSchedule, removeCourse, selectedCourses }) => {
  const [prioritized, setPrioritized] = useState([]);
  const [prioritizedTeachers, setPrioritizedTeachers] = useState({});
  const [offdays, setOffdays] = useState([]);
  const [firstLast, setFirstLast] = useState([0, 0]);
  const [gaps, setGaps] = useState([0, 0]);

  const slots = useSelector(state => state.app.slots);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOffdays(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      "&>*": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
    }}>
      <Box>
        <CourseListAccordion
          title="Selected Courses"
          data={selectedCourses.map((course) => ({
            ...course,
            mainText: `${course.instructor} - ${course.title}`,
            subText: `${course.erp} | ${course.days?.join(" & ")} | ${course.slot} | ${course.instructor} | ${course.title}  `,
          }))}
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
            {
              callback: (i) => removeCourse(i.erp),
              title: "Remove",
            },
          ]}
        />
      </Box>

      <Divider sx={{ m: dividerMargin }} />

      <Box>
        <CourseListAccordion
          title="Prioritized Courses"
          data={prioritized.map((course) => ({
            ...course,
            mainText: `${course.instructor} - ${course.title}`,
            subText: `${course.erp} | ${course.days?.join(" & ")} | ${course.slot}`,
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
      </Box>

      <Divider sx={{ m: dividerMargin }} />

      <Box>
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
      </Box>

      <Divider sx={{ m: dividerMargin }} />

      <Box >
        <Typography variant="button" sx={{ mr: 2 }}>Off days</Typography>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
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

      <Divider sx={{ m: dividerMargin }} />

      <Box >
        <Typography variant="button">First & last class</Typography>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>Last Class</InputLabel>
            <Select
              value={firstLast[1]}
              autoWidth
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
      </Box >

      <Divider sx={{ m: dividerMargin }} />

      <Box>
        <Typography variant="button">Min & max gap length (in terms of slots)</Typography>
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
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
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
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

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 0.5 }}>
        <Button variant="contained" onClick={makeSchedule({
          prioritized, prioritizedTeachers, gaps, firstLast, offdays
        })}>Make Schedule</Button>
      </Box>
    </Box >
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
