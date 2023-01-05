import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function StoryViewer({story}) {

    // Dialog box placed higher up
    // Each answer should be a sentence
    // After Apart from the events it should ask for states -> states do not have connecting states
    // Fix table to have linked states and linked events (event is action and state is condition)
    // Add connecting states as a different color node
    // Perhaps use E and S in image to differentiate
    // Later -> Most important test on MTurk Sandbox

    return(
        <div className="StoryViewer">
        <Grid className="StoryViewer"  justifyContent="center" container direction={'column'} sx={{height:300}}>
                <Grid item className="story">
                    <Typography variant='h4' fontStyle="oblique" align='left'>Story</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(1) " + story[0]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(2) " + story[1]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(3) " + story[2]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(4) " + story[3]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(5) " + story[4]}</Typography>
                </Grid>
            {/* </Box> */}
        </Grid>
    </div>
    )
}