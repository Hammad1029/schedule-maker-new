import { Box, Grid, Button } from "@mui/material";
import Constraints from "../components/Constraints";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import WeekCalendar from "../components/Calendar";
import AppBarTop from "../components/AppBarTop";
import Search from "../components/Search";
import WithModal from "../components/WithModal";
import httpService, { endpoints } from "../utils/http";
import { useDispatch } from "react-redux";
import { setAppData } from "../store/reducers/app";

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const [selectedCourses, setSelectedCourses] = useState([])
    const [schedules, setSchedules] = useState({
        errors: [],
        possibleSchedules: 3,
        schedules: [[]]
    })

    const addCourses = (courses) => setSelectedCourses(prev => [...prev, ...courses])
    const removeCourse = (erp) => setSelectedCourses(selectedCourses.filter(c => c.erp !== erp))
    
    useEffect(() => {
        getAppData()
    }, [])

    const getAppData = async () => {
        const response = await httpService({
            endpoint: endpoints.schedules.getAppInfo,
            base: endpoints.schedules.base,
        });
        if (response) dispatch(setAppData(response))
    }

    const makeSchedule = ({ prioritized, prioritizedTeachers, offdays, firstLast, gaps }) => async () => {
        try {
            // const reqBody = {
            //     courses: selectedCourses.map(i => i.erp),
            //     constraints: [
            //         {
            //             fn: "resolveTeachers",
            //             order: 2,
            //             data: [prioritizedTeachers]
            //         },
            //         {
            //             fn: "resolveGaps",
            //             order: 4,
            //             data: gaps
            //         },
            //         {
            //             fn: "resolveSpecific",
            //             order: 1,
            //             data: prioritized.map(i => i.erp)
            //         },
            //         {
            //             fn: "resolveDays",
            //             order: 3,
            //             data: offdays
            //         },
            //         {
            //             fn: "resolveTime",
            //             order: 5,
            //             data: firstLast
            //         }
            //     ]
            // }
            const response = await httpService({
                endpoint: endpoints.schedules.makeSchedule,
                base: endpoints.schedules.base,
                reqBody: JSON.parse(`{"courses":["7275","7585","7665","7345","7420","7664","7352","7479","7444","7547","7546","7408","7566","7543","7679","7573","7577","7493","7577","7571"],"constraints":[{"fn":"resolveTeachers","order":2,"data":[{"Operating Systems":"Ms. Tasbiha Fatima"}]},{"fn":"resolveGaps","order":4,"data":[0,0]},{"fn":"resolveSpecific","order":1,"data":["7679"]},{"fn":"resolveDays","order":3,"data":[]},{"fn":"resolveTime","order":5,"data":[10,13]}]}`)
            });
            if (response) setSchedules(response)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Box>
            <AppBarTop />
            <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
                <Grid item xs={12} lg={4}>
                    <Button
                        variant="contained"
                        onClick={() => props.openModal({
                            title: "Search courses",
                            bodyComp: <Search addCourses={addCourses} />
                        })}
                    >
                        Add course
                    </Button>

                    <Constraints makeSchedule={makeSchedule} removeCourse={removeCourse} selectedCourses={selectedCourses} />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <WeekCalendar schedules={schedules} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default WithModal(Dashboard);