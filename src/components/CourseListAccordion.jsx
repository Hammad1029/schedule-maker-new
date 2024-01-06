import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseListAccordion = ({ title = "", data = [], actions = [] }) => {
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.map((i, j) => (
          <Box
            key={j}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{i.mainText}</Typography>
              {i.subText && (
                <Typography variant="subtitle2">{i.subText}</Typography>
              )}
            </Box>
            <Box sx={{ mt: 1 }}>
              {actions.length > 0 && (
                <ButtonGroup
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  {actions.map((ac, k) => (
                    <Button fullWidth key={k} size="small" onClick={() => ac.callback(i)}>
                      {ac.title}
                    </Button>
                  ))}
                </ButtonGroup>
              )}
            </Box>
            {j !== data.length - 1 && (
              <Divider sx={{ m: 1.2, backgroundColor: "#700F1A" }} />
            )}
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseListAccordion;

