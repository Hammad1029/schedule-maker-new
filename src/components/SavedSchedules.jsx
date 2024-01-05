// SaveScheduleList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';
import { useDispatch } from 'react-redux';
import { setIndex, setSaved } from '../store/reducers/app.js';

const SavedSchedules = ({ populateSavedSchedule, closeModal }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.schedules.getSaveSchedule,
        base: endpoints.schedules.base,
      });
      if (response) {
        setSchedules(response.schedules);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const deleteSchedule = async (id) => {
    const response = await httpService({
      endpoint: endpoints.schedules.deleteSavedSchedule,
      base: endpoints.schedules.base,
      reqBody: { id },
      successNotif: true
    });
    if (response) getData()
  }

  const dispatch = useDispatch()

  return (
    <>
      {schedules.length > 0
        ? <Box component={Paper} elevation={6} sx={{
          border: "1px solid black",
          p: 2
        }}>
          {schedules.map((schedule, j) => (
            <Box key={j}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography variant="subtitle1">
                  {schedule.name}
                </Typography>
                <ButtonGroup variant="contained" sx={{ marginLeft: 1 }}>
                  <Button size="small" onClick={() => {
                    populateSavedSchedule(schedule.courses)
                    dispatch(setIndex(0))
                    dispatch(setSaved(true))
                    closeModal()
                  }}> Populate</Button>
                  <Button size="small" onClick={() => deleteSchedule(schedule.scheduleId)}>Delete</Button>
                </ButtonGroup>
              </Box>
              {j !== schedules.length - 1 && <Divider sx={{ m: 1.2, backgroundColor: "#700F1A" }} />}
            </Box>
          ))}
        </Box >
        : <Typography variant="h3">No Saved Schedules</Typography>}
    </>
  );
};

export default SavedSchedules;
