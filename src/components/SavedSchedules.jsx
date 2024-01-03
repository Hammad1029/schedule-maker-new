// SaveScheduleList.js
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';

const SavedSchedules = () => {
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

  return (
    <>
      {schedules.length > 0
        ? <List>
          {schedules.map((schedule) => (
            <ListItem key={schedule.scheduleID}>
              <ListItemText
                primary={`Schedule ID: ${schedule.scheduleId}`}
                secondary={`Course IDs: ${schedule.coursesId.join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
        : <Typography variant="h3">No Saved Schedules</Typography>}
    </>
  );
};

export default SavedSchedules;
