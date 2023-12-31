import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
    Calendar,
    Views,
    momentLocalizer,
} from 'react-big-calendar'
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WithModal from './WithModal'
import { NotificationManager } from 'react-notifications'
import { setIndex } from '../store/reducers/app'

const localizer = momentLocalizer(moment)

const WeekCalendar = ({ schedules, saveSchedule }) => {
    const slots = useSelector(state => state.app.slots)
    const { selectedIdx } = useSelector(state => state.app)



    const transformSched = () => {
        return schedules.schedules[selectedIdx]?.map((course) => {
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

    const calendarComponents = {
        event: EventComponent,
        toolbar: () => <CustomToolbarWrapped
            possibleSchedules={schedules.possibleSchedules}
            saveSchedule={saveSchedule}
        />
    }

    return (
        <Box>
            {slots.length > 0 && (
                <Calendar
                    events={transformSched()}
                    components={calendarComponents}
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
                    eventPropGetter={eventPropGetter}
                />
            )}
        </Box>
    );
};

export default WeekCalendar;

const CustomToolbar = ({ saveSchedule, possibleSchedules, selected, ...props }) => {
    const dispatch = useDispatch();
    const setSelected = (idx) => () => dispatch(setIndex(idx))
    const { selectedIdx, saved } = useSelector(state => state.app)
    const loggedIn = useSelector(state => state.user.loggedIn)
    return (
        <Box sx={{ justifyContent: "space-between", alignItems: "center", display: "flex", mb: 1 }}>
            <Box>
                <ButtonGroup disabled={possibleSchedules === 0} sx={{ justifySelf: "center" }} variant="contained">
                    <Button disabled={selectedIdx === 0} onClick={setSelected(selectedIdx - 1)}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button disabled={saved} onClick={() => loggedIn
                        ? props.openModal({
                            title: "Save Schedule",
                            bodyComp: <SaveScheduleModal
                                closeModal={props.closeModal}
                                saveSchedule={(name) => saveSchedule(selectedIdx, name)} />
                        }) : NotificationManager.error("Please login first")} >
                        Save Schedule
                    </Button>
                    <Button disabled={selectedIdx === possibleSchedules - 1} onClick={setSelected(selectedIdx + 1)} >
                        <ChevronRightIcon />
                    </Button>
                </ButtonGroup >
            </Box>
            <Box>
                <Typography sx={{ textAlign: "center" }}>{possibleSchedules} schedules avaialble</Typography>
            </Box>
        </Box >
    )
}

const CustomToolbarWrapped = WithModal(CustomToolbar)

const EventComponent = ({ event }) => {
    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">{event.title}</Typography>,
        </Box>
    )
}

const eventPropGetter = () => ({
    style: {
        backgroundColor: "#700F1A",
        borderRadius: '5px',
        padding: "0px 10px",
    }
});

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