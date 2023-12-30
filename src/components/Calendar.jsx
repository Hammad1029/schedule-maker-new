import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
} from 'react-big-calendar'
import { Box } from '@mui/material'
// import 'moment/locale/en-gb';

const localizer = momentLocalizer(moment)

const WeekCalendar = ({ schedule, slots }) => {

    return (
        <Box>
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
                components={{
                    toolbar: CustomToolbar,
                }}  
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

const CustomToolbar = toolbar => {
    const { label } = toolbar;

    return (
        <div>
            <button onClick={() => console.log(toolbar)} style={{ float: 'right' }}>
                View others
            </button>
        </div>
    );
};