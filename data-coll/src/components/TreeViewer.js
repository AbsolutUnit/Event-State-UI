import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FamDiagram } from './Diagrams';
import { PageFitMode, Enabled, GroupByType } from 'basicprimitives';
import Paper from '@mui/material/Paper';

export default function TreeViewer({treeData}) {

    // treeData.map((obj, index) => {
    //     obj.id = index;
    //     obj.title = "Event";
    //     obj.description = obj.label;
    //     obj.image = "";
    //     delete Object.assign(obj, {event: obj.label });
    // });
    
    var data = [];
    
    treeData.forEach(element => {
        data.push({
            "id": treeData.indexOf(element),
            "title": "",
            "description": element.event,
            "parents": element.parents,
            "image": "",
            "label": ""
        });
    });

    console.log("Tree DATA: ");
    console.log(data);


    var config = {
        pageFitMode: PageFitMode.AutoSize,
        // cursorItem: 2,
        // linesWidth: 1,
        linesColor: "black",
        hasSelectorCheckbox: Enabled.False,
        // normalLevelShift: 20,
        // dotLevelShift: 20,
        // lineLevelShift: 20,
        // normalItemsInterval: 10,
        // dotItemsInterval: 30,
        // lineItemsInterval: 30,
        arrowsDirection: GroupByType.Parents,
        showExtraArrows: true,
        items: data
    };
    // console.log("CONFIG ITEMS");
    // console.log(config.items);

    return(
        <div className="TreeViewer">
            <Grid className="TreeViewer2">
                <Grid item className="story">
                    <Typography variant='h4' fontStyle="oblique" align='left'>Event State Graph</Typography>
                </Grid>
                <Grid item className="form2">
                <Paper>
                    <FamDiagram centerOnCursor={true} config={config} />
                </Paper>
                </Grid>
            </Grid>
        </div>
    )
}