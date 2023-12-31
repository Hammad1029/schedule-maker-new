import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseListAccordion = ({ title = "", data = [], actions = [] }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: "30vh", overflowY: "scroll" }}>
                {data.map((i, j) => (
                    <Box key={j} sx={{
                        padding: 1,
                        backgroundColor: j % 2 === 0 ? "#E0F0EA" : "#95ADBE",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Box>
                            <Typography variant="subtitle1">
                                {i.mainText}
                            </Typography>
                            {i.subText &&
                                <Typography variant="caption">
                                    {i.subText}
                                </Typography>}
                        </Box>
                        {actions.length > 0 &&
                            <ButtonGroup variant="contained" sx={{ marginLeft: 1 }}>
                                {actions.map(ac => (
                                    <Button onClick={() => ac.callback(i)}> {ac.title}</Button>
                                ))}
                            </ButtonGroup>}
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion >
    )
}

export default CourseListAccordion;