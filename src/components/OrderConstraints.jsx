import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, IconButton } from '@mui/material';
import _ from "lodash"

const OrderConstraints = ({ order, setOrder, name, children }) => {
    const changeOrder = (action = 1) => () =>
        setOrder(prev => {
            const newVal = prev[name].order + action
            const replaceKey = _.findKey(prev, { order: newVal })
            return ({
                ...prev,
                [name]: ({ ...prev[name], order: newVal, }),
                [replaceKey]: ({ ...prev[replaceKey], order: prev[name].order })
            })
        })


    const buttonStyle = { backgroundColor: "rgba(0,0,0,0.1)", margin: "0px 5px" }
    return (
        <Box sx={{ overflowX: "auto" }}>
            <IconButton
                sx={buttonStyle}
                disabled={order[name].order === 1}
                onClick={changeOrder(-1)}>
                <ArrowUpwardIcon />
            </IconButton>
            {children}
            <IconButton
                sx={buttonStyle}
                disabled={order[name].order === Object.keys(order).length}
                onClick={changeOrder(1)}>
                <ArrowDownwardIcon />
            </IconButton>
        </Box>
    )
}

export default OrderConstraints