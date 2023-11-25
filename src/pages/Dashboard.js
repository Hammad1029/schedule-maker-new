import { Grid } from "@mui/material";

const Dashboard = () => {
    return (
        <Grid container>
            <Grid item xs={12} lg={4}>
                {/* ADD SEARCH BUTTON HERE */}
                <h1>HERE FORM</h1>
            </Grid>
            <Grid item xs={12} lg={8}>
                <h1>HERE CALENDAR</h1>
            </Grid>
        </Grid>
    )
}

export default Dashboard;