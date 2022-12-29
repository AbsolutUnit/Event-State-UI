import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function StoryViewer() {

    const stories = [
        ["I bought a box of packing tape from Amazon.", "It was an Amazon Prime order.", "The package was supposed to arrive on Wednesday by 8 pm.", "It did not arrive that day.", "I contacted Amazon and accepted a $5 credit."],
        ["David and I went to work at our grocery store.", "Everything was fine until an unforeseen accident occurred.", "The store's electricity went out which had caused the vegetables to go bad.", "We had to go to each vegetable section and throw all the veggies away.", "This was the biggest waste I've seen."],
        ["Amy went to the kitchen to see what was for dinner", "She had played hard at volleyball practice and was hungry.", "Her mother informed her dinner wouldn't be ready for an hour.", "Her mother suggested she eat a snack.", "She declined, she didn't want a snack to ruin her appetite."],
        ["The jihadist called the support line with a complaint of an itch.", "His vest bomb had been bothering him for the better part of a day.", "The support tech requested the number to the mobile attached to it.", "Promising only a quick tweak was necessary, the tech called the phone.", "The support line went dead, and tech went back to reading his book."],
        ["Neil had seen many countries in the Middle East.", "He decided to see Qatar too.", "He thought it would be similar to other countries he had seen.", "But it had its own unique culture and history.", "Neil was glad he had made time to see Qatar."]
    ];

    

    const currentStory = stories[Math.floor(Math.random() * stories.length)];

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
                    <Typography variant='h5' align='left'>{"(1) " + currentStory[0]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(2) " + currentStory[1]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(3) " + currentStory[2]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(4) " + currentStory[3]}</Typography>
                </Grid>
                <Grid item className="story">
                    <Typography variant='h5' align='left'>{"(5) " + currentStory[4]}</Typography>
                </Grid>
            {/* </Box> */}
        </Grid>
    </div>
    )
}