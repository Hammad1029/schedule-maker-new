// SaveScheduleList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';

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

  return (
    <>
      {schedules.length > 0
        ? <Box>
          {schedules.map((schedule, j) => (
            <Box key={j} sx={{
              padding: 1,
              backgroundColor: j % 2 === 0 ? "#E0F0EA" : "#95ADBE",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <Box>
                <Typography variant="subtitle1">
                  {schedule.name}
                </Typography>
              </Box>

              <ButtonGroup variant="contained" sx={{ marginLeft: 1 }}>
                <Button size="small" onClick={() => {
                  populateSavedSchedule(schedule.courses)
                  closeModal()
                }}> Populate</Button>
                <Button size="small" onClick={() => deleteSchedule(schedule.scheduleId)}>Delete</Button>
              </ButtonGroup>
            </Box>
          ))}
        </Box >
        : <Typography variant="h3">No Saved Schedules</Typography>}
    </>
  );
};

export default SavedSchedules;
