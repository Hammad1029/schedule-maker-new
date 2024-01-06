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
import OrderConstraints from "./OrderConstraints";

const Constraints = ({ makeSchedule, removeCourse, selectedCourses }) => {
  const [prioritized, setPrioritized] = useState([]);
  const [prioritizedTeachers, setPrioritizedTeachers] = useState({});
  const [offdays, setOffdays] = useState([]);
  const [firstLast, setFirstLast] = useState([0, 0]);
  const [gaps, setGaps] = useState([0, 0]);
 //const slotsData = useSelector((state) => state.app.slots);
  const slots = slotsData.map((slot) => ({ id: slot.id, timing: slot.timing }));
//console.log(slots)
  const [order, setOrder] = useState({
    resolveSpecific: {
      order: 1,
      state: "prioritized",
      component: (
        <CourseListAccordion
          title="Prioritized Courses"
          data={prioritized.map((course) => ({
            ...course,
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
      ),
    },
    resolveTeachers: {
      order: 2,
      state: "prioritizedTeachers",
      component: (
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
      ),
    },
    resolveDays: {
      order: 3,
      state: "offdays",
      component: (
        <>
          <Typography variant="button" sx={{ mr: 2 }}>
            Off days
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel>Off days</InputLabel>
            <Select
              multiple
              value={offdays}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setOffdays(
                  typeof value === "string" ? value.split(",") : value
                );
              }}
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
        </>
      ),
    },
    resolveTime: {
      order: 4,
      state: "firstLast",
      component: (
        <>
          <Typography variant="button">First & last class</Typography>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>First Class</InputLabel>
              <Select
                value={firstLast[0]}
                label="First Class"
                onChange={(e) =>
                  setFirstLast((prev) => [e.target.value, prev[1]])
                }
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
                onChange={(e) =>
                  setFirstLast((prev) => [prev[0], e.target.value])
                }
              >
                {slots.map((i) => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.timing}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      ),
    },
    resolveGaps: {
      order: 5,
      state: "gaps",
      component: (
        <>
          <Typography variant="button">
            Min & max gap length (in terms of slots)
          </Typography>
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
        </>
      ),
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        "&>*": {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <Box>
        <CourseListAccordion
          title="Selected Courses"
          data={selectedCourses.map((course) => ({
            ...course,
            mainText: `${course.instructor} - ${course.title}`,
            subText: `${course.erp} | ${course.days?.join(" & ")} | ${
              course.slot
            } | ${course.instructor} | ${course.title}  `,
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <Typography variant="button" color="error">
          Please order by the priority of your requirements
        </Typography>
      </Box>

      {_.sortBy(Object.entries(order), ([, value]) => value.order).map(
        ([key, { component }], j) => (
          <>
            <OrderConstraints order={order} setOrder={setOrder} name={key}>
              {component}
            </OrderConstraints>
            {j !== 4 && <Divider sx={{ m: 1.2, backgroundColor: "#700F1A" }} />}
          </>
        )
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        {/* <Button variant="contained" onClick={makeSchedule({
          prioritized: prioritized.map(i => i.erp),
          prioritizedTeachers: [prioritizedTeachers],
          gaps,
          firstLast,
          offdays, order
        })}>Make Schedule</Button> */}
        <Button
          variant="contained"
          onClick={makeSchedule(
            {
              offdays,
              gaps,
              prioritized: prioritized.map((i) => i.erp),
              prioritizedTeachers: [prioritizedTeachers],
              firstLast,
            },
            order
          )}
        >
          Make Schedule
        </Button>
      </Box>
    </Box>
  );
};

export default Constraints;
const slotsData = [
  {
    id: 1,
    timing: "08:30:00",
  },
  {
    id: 2,
    timing: "10:00:00",
  },
  {
    id: 3,
    timing: "11:30:00",
  },
  {
    id: 4,
    timing: "13:00:00",
  },
  {
    id: 5,
    timing: "14:30:00",
  },
  {
    id: 6,
    timing: "16:00:00",
  },
  {
    id: 7,
    timing: "17:30:00",
  },
  {
    id: 8,
    timing: "19:00:00",
  },
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
