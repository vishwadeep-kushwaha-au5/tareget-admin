import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

}))

function InfoWindowContent({ selected }) {
    const classes = useStyles()

    return (
        <div>
            <Typography variant="h3">{selected.placeName}</Typography>
            <br />
            <Box color="primary.main" fontWeight={600} fontSize={12}>{selected.stopsCount} Stops &#183; {selected.days} Days</Box>
        </div>
    )
}

export default InfoWindowContent