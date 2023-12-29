import { Box, Grid } from "@mui/material";
import Constraints from "../components/Constraints";
import { useState } from "react";
import * as _ from "lodash";
import WeekCalendar from "../components/Calendar";
import AppBarTop from "../components/AppBarTop";

const Dashboard = () => {
    const [selectedCourses, setSelectedCourses] = useState(sampleData.map(course => {
        const slot = _.find(slotsData, { id: course.slot });
        return ({
            ...course,
            startTime: slot ? slot.timing : null,
        })
    }))
    const [slots, setSlots] = useState(slotsData)

    return (
        <Box>
            <AppBarTop />
            <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
                <Grid item xs={12} lg={4}>
                    {/* ADD SEARCH BUTTON HERE */}
                    <Constraints slots={slots} selectedCourses={selectedCourses} />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <WeekCalendar slots={slots} schedule={selectedCourses} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard;

const slotsData = [
    {
        "id": 65,
        "timing": "08:30:00"
    },
    {
        "id": 66,
        "timing": "10:00:00"
    },
    {
        "id": 67,
        "timing": "11:30:00"
    },
    {
        "id": 68,
        "timing": "13:00:00"
    },
    {
        "id": 69,
        "timing": "14:30:00"
    },
    {
        "id": 70,
        "timing": "16:00:00"
    },
    {
        "id": 71,
        "timing": "17:30:00"
    },
    {
        "id": 72,
        "timing": "19:00:00"
    }
]

const sampleData = [
    {
        "id": 24381,
        "slot": 69,
        "days": [
            "friday",
            "saturday"
        ],
        "title": "Financial Accounting",
        "program": "BBA-3",
        "room": "EVENT HALL",
        "erp": "7035",
        "instructor": "Ms. Mahwish Baasit Hussain",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24384,
        "slot": 65,
        "days": [
            "friday",
            "saturday"
        ],
        "title": "Pakistan History",
        "program": "BSSS-3",
        "room": "MAC-1",
        "erp": "7135",
        "instructor": "Mr. Moiz Khan",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24387,
        "slot": 70,
        "days": [
            "monday",
            "wednesday"
        ],
        "title": "Regulations & Financial Markets",
        "program": "BSAF-3",
        "room": "MAC-2",
        "erp": "7348",
        "instructor": "Mr. Yousuf Saudagar",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24390,
        "slot": 68,
        "days": [
            "friday",
            "saturday"
        ],
        "title": "Contemporary Issues in Global Economics",
        "program": "BSECO (T/D)",
        "room": "MAC-3",
        "erp": "7249",
        "instructor": "Ms. Umema Siddiqi",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24393,
        "slot": 65,
        "days": [
            "friday",
            "saturday"
        ],
        "title": "Financial Reporting",
        "program": "BSAF-5",
        "room": "MAC-4",
        "erp": "7367",
        "instructor": "Mr. Naved Bukhari\r\n",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24396,
        "slot": 65,
        "days": [
            "monday",
            "wednesday"
        ],
        "title": "Numerical Analysis",
        "program": "BSCS-3",
        "room": "MAC-5",
        "erp": "7530",
        "instructor": "Dr. Nasir Touheed",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    },
    {
        "id": 24399,
        "slot": 67,
        "days": [
            "tuesday",
            "thursday"
        ],
        "title": "Introduction to Business Finance",
        "program": "BBA-3",
        "room": "MAC-6",
        "erp": "7595",
        "instructor": "Ms. Tahira Jaffery",
        "createdAt": "2023-11-11T07:02:46.107Z",
        "updatedAt": "2023-11-11T07:02:46.107Z",
        "SlotId": null,
        "Slot": null
    }
]