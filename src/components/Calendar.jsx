import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
    Calendar,
    Views,
    momentLocalizer,
} from 'react-big-calendar'
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from "lodash"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WithModal from './WithModal'
import { NotificationManager } from 'react-notifications'

const localizer = momentLocalizer(moment)

const WeekCalendar = ({ schedules, saveSchedule }) => {
    const slots = useSelector(state => state.app.slots)
    const [selected, setSelected] = useState(0)



    const transformSched = () => {
        return schedules.schedules[selected]?.map((course) => {
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
    };

    // useEffect(() => {
    //     Array.isArray(schedules.schedules[idx]) &&
    //         schedules.schedules[idx].length > 0 &&
    //         transformSched(0);
    // }, [schedules, idx]);

    return (
        <Box>
            {slots.length > 0 && (
                <Calendar
                    events={transformSched()}
                    components={{
                        toolbar: () => <CustomToolbarWrapped
                            schedules={schedules}
                            setSelected={setSelected}
                            saveSchedule={saveSchedule}
                            selected={selected}
                        />
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

const CustomToolbar = ({ setSelected, saveSchedule, schedules: { possibleSchedules, schedules }, selected, ...props }) => {
    const loggedIn = useSelector(state => state.user.loggedIn)
    return (
        <Box sx={{ justifyContent: "space-between", alignItems: "center", display: "flex", mb: 1 }}>
            <ButtonGroup disabled={possibleSchedules === 0} sx={{ justifySelf: "center" }} variant="contained">
                <Button disabled={selected === 0} onClick={() => setSelected(prev => prev - 1)}>
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={() => loggedIn
                    ? props.openModal({
                        title: "Save Schedule",
                        bodyComp: <SaveScheduleModal
                            closeModal={props.closeModal}
                            saveSchedule={(name) => saveSchedule(selected, name)} />
                    }) : NotificationManager.error("Please login first")} >
                    Save Schedule
                </Button>
                <Button disabled={selected === possibleSchedules - 1} onClick={() => setSelected(prev => prev + 1)} >
                    <ChevronRightIcon />
                </Button>
            </ButtonGroup >
            <Box >
                <Typography>{possibleSchedules} schedules avaialble</Typography>
            </Box>
        </Box >
    )
}

const CustomToolbarWrapped = WithModal(CustomToolbar)

const SaveScheduleModal = ({ saveSchedule, closeModal }) => {
    const [name, setName] = useState("")
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <TextField label="Schedule Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button variant="contained" onClick={() =>
                name === "" || name.length < 3
                    ? NotificationManager.warning("Please enter a vaid name")
                    : saveSchedule(name) && closeModal()
            }>
                Save
            </Button>
        </Box >
    )
}