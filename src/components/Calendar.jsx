import React, { Fragment, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
} from 'react-big-calendar'
import { Box } from '@mui/material'
import httpService, { endpoints } from '../utils/http'
// import 'moment/locale/en-gb';

const localizer = momentLocalizer(moment)

const WeekCalendar = ({ schedule, slots }) => {
    const [coursesId, setCoursesId] = useState([]);
  const [constraints, setConstraints] = useState({});

  useMemo(() => {
    setCoursesId(schedule.map(course => course.id));
    setConstraints({
      schedule: schedule,
      slots: slots,
    });
  }, [schedule, slots]);



    return (
        <Box>
            <CustomToolbar label="YourLabel" coursesId={coursesId} constraints={constraints} />
            <Calendar
                events={schedule.map(course => {
                    const start = moment(course.startTime, "HH:mm:ss").clone();
                    const end = start.clone().add(1, "hours").add(15, "minutes")
                    return course.days.map(day => ({
                        id: course.erp,
                        title: course.title,
                        start: start.day(day).toDate(),
                        end: end.day(day).toDate()
                    }))
                }).flat()} 
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                step={90}
                timeslots={1}
                min={moment(slots[0].timing, "HH:mm:ss").toDate()}
                max={moment(slots[slots.length - 1].timing, "HH:mm:ss").toDate()}
                views={[Views.WEEK]}
                view={Views.WEEK}
                style={{ height: "75vh" }}
            />
        </Box>
    )
}

export default WeekCalendar;

const CustomToolbar = ({ label, coursesId, constraints })  => {
  

    const handleSaveSchedule = async () => {
        try{
            const response = await httpService({
                endpoint: endpoints.schedules.saveSchedule,
                base: endpoints.schedules.base,
                reqBody: { coursesId, constraints },
                successNotif: true
            });
        }catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={handleSaveSchedule} style={{ float: 'right', marginBottom: '10px' }}>
                View Others
            </button>
            <button style={{ float: 'right', marginRight: '20px'  }}>
                Save Schedule
            </button>
            
        </div>
    );
};