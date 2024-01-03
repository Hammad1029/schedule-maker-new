
import React, { Fragment, useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import moment from 'moment'
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
} from 'react-big-calendar'
import { Box, Button, ButtonGroup } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from "lodash"
const CustomToolbar = ({ toolbar, setSelected, saveSchedule }) => {
  const { label } = toolbar;

  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => setSelected((prev) => Math.max(prev - 1, 0))} style={{ float: 'right' }}>
        View Prev
      </Button>
      <Button onClick={() => setSelected((prev) => prev + 1)} style={{ float: 'right' }}>
        View Next
      </Button>
      <Button onClick={saveSchedule} style={{ float: 'right' }}>
        Save Schedule
      </Button>
    </ButtonGroup>
  );
};
const localizer = momentLocalizer(moment)

// Update your WeekCalendar component
const WeekCalendar = ({ schedules = [[]] }) => {
  const slots = useSelector((state) => state.app.slots);
  const [selected, setSelected] = useState([]);
  const [idx, setIdx] = useState(0);

  const saveSchedule = () => {
    // Implement your saveSchedule logic here
  };

  const transformSched = () => {
    setSelected(
      schedules.schedules[idx]?.map((course) => {
        const slot = _.find(slots, { id: course.slot });
        return {
          ...course,
          startTime: slot ? slot.timing : null,
        };
      })?.map((course) => {
        const start = moment(course.startTime, 'HH:mm:ss').clone();
        const end = start.clone().add(1, 'hours').add(15, 'minutes');
        return course.days.map((day) => ({
          id: course.erp,
          title: course.title,
          start: start.day(day).toDate(),
          end: end.day(day).toDate(),
        }));
      }).flat() || []
    );
  };

  useEffect(() => {
    Array.isArray(schedules.schedules[idx]) &&
      schedules.schedules[idx].length > 0 &&
      transformSched(0);
  }, [schedules, idx]);

  return (
    <Box>
      {slots.length > 0 && (
        <Calendar
          events={selected}
          components={{
            toolbar: (t) => <CustomToolbar toolbar={t} setSelected={setIdx} saveSchedule={saveSchedule} />,
          }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          step={90}
          timeslots={1}
          min={moment(slots[0].timing, 'HH:mm:ss').toDate()}
          max={moment(slots[slots.length - 1].timing, 'HH:mm:ss').toDate()}
          views={[Views.WEEK]}
          view={Views.WEEK}
          style={{ height: '75vh' }}
        />
      )}
    </Box>
  );
};

export default WeekCalendar;
