// SaveScheduleList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';

const ViewSchedulesDialog = ({ open, onClose, schedules }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Saved Schedules</DialogTitle>
        <DialogContent dividers>
          <List>
            {schedules.map((schedule) => (
              <ListItem key={schedule.scheduleID}>
                <ListItemText
                  primary={`Schedule ID: ${schedule.scheduleId}`}
                  secondary={`Course IDs: ${schedule.coursesId.join(', ')}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

const SaveScheduleList = ({ open, onClose, erp }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpService({
          endpoint: endpoints.schedules.getSaveSchedule,
          base: endpoints.schedules.base,
          reqBody: { erp },
          successNotif: true
        });

        
        
        if (response) {
          setSchedules(response.schedules);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ViewSchedulesDialog open={open} onClose={onClose} schedules={schedules} />
  );
};

export default SaveScheduleList;
