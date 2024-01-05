import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Login from "./Login";
import SignUp from "./SignUp";
import WithModal from "./WithModal";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/reducers/user';
import { NotificationManager } from 'react-notifications';
import { Divider, Grid } from '@mui/material';
import SavedSchedules from './SavedSchedules'; // Adjusted import

const AppBarTop = (props) => {
  const { userDetails: { firstName, lastName }, loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const viewSaved = () => {
    if (!loggedIn) NotificationManager.error("Please Login First")
    else
      props.openModal({
        title: "Saved Schedules",
        maxWidth:"sm",
        bodyComp: (
          <SavedSchedules populateSavedSchedule={props.populateSavedSchedule} closeModal={props.closeModal} />
        )
      })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Button sx={{ mr: "auto" }} variant="contained" color="primary" onClick={viewSaved}>
            View Saved Schedules
          </Button>

          {loggedIn ?
            <>
              <Typography style={{ mr: 1 }}>{firstName} {lastName}</Typography>
              <Button color="inherit" onClick={() => dispatch(logoutUser())}>Logout</Button>
            </>
            : <Button color="inherit" onClick={() =>
              props.openModal({
                title: "Login / Sign Up",
                bodyComp: (
                  <Grid sx={{ display: "flex", alignItem: "center", justifyContent: "center" }} spacing={2} container>
                    <Grid item xs={12} md={6} >
                      <Typography variant="body1" sx={{ mb: 2 }}>Login</Typography>
                      <Login closeModal={props.closeModal} />
                    </Grid>
                    <Box
                      component={Grid}
                      item
                      xs={12}
                      display={{ md: "none", sm: "block" }}
                    >
                      <Divider sx={{ m: 3, backgroundColor: "black" }} />
                    </Box>
                    <Grid item xs={12} md={6} >
                      <Typography variant="body1" sx={{ mb: 2 }}>Sign Up</Typography>
                      <SignUp />
                    </Grid>
                  </Grid>)
              })}
            >Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default WithModal(AppBarTop);
