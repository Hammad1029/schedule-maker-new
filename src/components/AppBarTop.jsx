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
import { Grid } from '@mui/material';
import SaveScheduleList from './saveSchedule'; // Adjusted import

const AppBarTop = (props) => {
  const { userDetails: { firstName, lastName, erp }, loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const [isSaveScheduleListOpen, setSaveScheduleListOpen] = React.useState(false);

  const handleCloseSaveScheduleList = () => {
    setSaveScheduleListOpen(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
            <Button sx={{ mr: "auto" }} color="inherit" onClick={() => setSaveScheduleListOpen(true)}>
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
                    <Grid item xs={6}>
                      <Typography>Login</Typography>
                      <Login closeModal={props.closeModal}/>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Sign Up</Typography>
                      <SignUp />
                    </Grid>
                  </Grid>)
              })}
            >Login</Button>}
        </Toolbar>
      </AppBar>
      {/* Render the SaveScheduleList component based on state */}
      <SaveScheduleList erp={erp} open={isSaveScheduleListOpen} onClose={handleCloseSaveScheduleList} />
    </Box>
  );
}

export default WithModal(AppBarTop);
