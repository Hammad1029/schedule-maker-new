import { Box, Grid, Button, Paper } from "@mui/material";
import Constraints from "../components/Constraints";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import WeekCalendar from "../components/Calendar";
import AppBarTop from "../components/AppBarTop";
import Search from "../components/Search";
import WithModal from "../components/WithModal";
import httpService, { endpoints } from "../utils/http";
import { useDispatch } from "react-redux";
import { setAppData, setSaved } from "../store/reducers/app";
import { NotificationManager } from "react-notifications";

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const [selectedCourses, setSelectedCourses] = useState([])
    const [schedules, setSchedules] = useState({
        errors: [],
        possibleSchedules: 0,
        schedules: [[]]
    })
    const [generationReq, setGenerationReq] = useState({})

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

    const populateSavedSchedule = (schedule) => setSchedules({
        errors: [],
        possibleSchedules: 1,
        schedules: [schedule]
    })

    const makeSchedule = (data, order) => async () => {
        try {
            if (selectedCourses.length === 0) return NotificationManager.error("Please add courses")
            const reqBody = {
                courses: selectedCourses.map(i => i.erp),
                constraints: Object.keys(order).map(key => ({
                    fn: key,
                    order: data[key].order,
                    data: data[order[key].state]
                }))
            }
            // const reqBody = JSON.parse(`{"courses":["7275","7585","7665","7345","7420","7664","7352","7479","7444","7547","7546","7408","7566","7543","7679","7573","7577","7493","7577","7571"],"constraints":[{"fn":"resolveTeachers","order":2,"data":[{"Operating Systems":"Ms. Tasbiha Fatima"}]},{"fn":"resolveGaps","order":4,"data":[0,0]},{"fn":"resolveSpecific","order":1,"data":["7679"]},{"fn":"resolveDays","order":3,"data":[]},{"fn":"resolveTime","order":5,"data":[10,13]}]}`)
            const response = await httpService({
                endpoint: endpoints.schedules.makeSchedule,
                base: endpoints.schedules.base,
                reqBody
            });
            if (response) {
                NotificationManager.success(
                    response.possibleSchedules > 0 ? `${response.possibleSchedules} schedules made` : "No possible schedule"
                )
                response.errors.map(er => (
                    NotificationManager.warning(er)
                ))
                setSchedules(response)
                setGenerationReq(reqBody)
                dispatch(setSaved(false))
            }
        } catch (e) {
            console.error(e)
        }
    }

    const saveSchedule = async (schedId, name) => {
        const response = await httpService({
            endpoint: endpoints.schedules.saveSchedule,
            base: endpoints.schedules.base,
            reqBody: {
                coursesId: schedules.schedules[schedId].map(s => s.id),
                constraints: generationReq,
                name
            },
            successNotif: true
        });
    }

    return (
        <Box>
            <AppBarTop populateSavedSchedule={populateSavedSchedule} />
            <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
                <Grid item xs={12} lg={4}>
                    <Box component={Paper} elevation={12} sx={{
                        padding: "30px 10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => props.openModal({
                                title: "Search courses",
                                bodyComp: <Search addCourses={addCourses} />,
                                maxWidth: "lg"
                            })}
                            sx={{ mb: 1 }}
                        >
                            Add courses
                        </Button>

                        <Constraints makeSchedule={makeSchedule} removeCourse={removeCourse} selectedCourses={selectedCourses} />
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Box component={Paper} elevation={12} sx={{ p: 2 }}>
                        <WeekCalendar saveSchedule={saveSchedule} schedules={schedules} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WithModal(Dashboard);