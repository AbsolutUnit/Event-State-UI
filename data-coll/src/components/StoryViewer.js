import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function StoryViewer() {

    const currentStory = [
        "Jack thought his new trench coat was very sleek.",
        "He wore it no matter the season.",
        "One day he noticed a small tear in the back.",
        "Spiders were crawling out of the breach.",
        "Jack doesn't wear his trench coat any more."
    ];

    // Write basic run documentation
    // Highlight/point out backend data 
    // Add connecting states as a different color node
    // Add multiple stories
    // Perhaps use E and S in image to differentiate
    // Later -> Most important test on MTurk Sandbox

    return(
        <div className="StoryViewer">
        <Grid className="StoryViewer"  justifyContent="center" container direction={'column'} sx={{height:300}}>
            {/* <Box display="flex" alignItems="center" className="StoryViewer"> */}
                <Grid item className="story">
                    <Typography variant='h4' fontStyle="oblique" align='left'>Story</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>(1) Jack thought his new trench coat was very sleek.</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>(2) He wore it no matter the season.</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>(3) One day he noticed a small tear in the back.</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>(4) Spiders were crawling out of the breach.</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>(5) Jack doesn't wear his trench coat any more.</Typography>
                </Grid>
            {/* </Box> */}
        </Grid>
    </div>
    )
}