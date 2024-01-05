import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Divider, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseListAccordion = ({ title = "", data = [], actions = [] }) => {
    return (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: "30vh" }}>
                {data.map((i, j) => (
                    <>
                        <Box key={j} sx={{ display: "flex" }}>
                            <Box>
                                <Typography variant="subtitle1">
                                    {i.mainText}
                                </Typography>
                                {i.subText &&
                                    <Typography variant="caption">
                                        {i.subText}
                                    </Typography>}
                            </Box>
                            <Box>
                                {actions.length > 0 &&
                                    <ButtonGroup orientation="vertical" variant="contained" sx={{ marginLeft: 1 }}>
                                        {actions.map(ac => (
                                            <Button size="small" onClick={() => ac.callback(i)}> {ac.title}</Button>
                                        ))}
                                    </ButtonGroup>}
                            </Box>
                        </Box>
                        {j !== data.length - 1 && <Divider sx={{ m: 1.2, backgroundColor: "#700F1A" }} />}
                    </>
                ))}
            </AccordionDetails>
        </Accordion >
    )
}

export default CourseListAccordion;