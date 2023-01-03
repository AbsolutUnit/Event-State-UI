import { Button, Typography } from '@mui/material';
import React, { Component, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';


export default function Questionnaire({callBack, data}) {
    const [log, setLog] = React.useState([">>> Last action performed by a participant in the story :: "]);
    const [answer, setAnswer] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [currentEvent, setCurrentEvent] = React.useState("");
    const [precondEvents, setPreCondEvents] = React.useState([]);
    const [questionList, setQuestionList] = React.useState([log[0]]);
    const [pastEvents, setPastEvents] = React.useState([]);
    const [linkStateGraph, setLinkStateGraph] = React.useState([]);

    const handleChange = (ev) => {
        setAnswer(
            ev.target.value
        );
    }

    const returnData = () => {
        var textToSave = JSON.stringify(data);
        var hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
    }

    useEffect(() => {
        callBack(linkStateGraph);
    }, [linkStateGraph]);

    const logHelper = (question) => {
        setLog(
            [...log, answer, question]
        );
        setAnswer(
            ""
        );
        // console.log(log)
    }

    const nextQuestion = () => {
        // console.log("QUESTION");
        // console.log(questionList[questionList.length - 1]);
        if (questionList[questionList.length - 1].includes("Last action")) {
            if (currentEvent !== ""){
                var question = `>>> Event that DIRECTLY caused/enabled [EV: ${currentEvent}] ('none' to STOP):: `
                setQuestionList(
                    [...questionList, question]
                );
                setLinkStateGraph(
                    [{
                        event: currentEvent,
                        linked: [],
                        parents: []
                    }]
                );
                logHelper(question);
            } else {
                logHelper(">>> Select the sentence where this event is mentioned (1 or 2 or ... or 5) :: ");
                setCurrentEvent(
                    answer
                );
            }
        } else if (questionList[questionList.length - 1].includes("DIRECTLY caused/enabled")) {
            if (answer == "none"){
                if (precondEvents.length == 0 && pastEvents.length == 0) {
                    setDisabled(
                        !disabled
                    );
                } else if (precondEvents.length == 0) {
                    var question = `>>> Event that DIRECTLY caused/enabled [EV: ${pastEvents[0]}] ('none' to STOP):: `
                    setCurrentEvent(
                        pastEvents[0]
                    );
                    setQuestionList(
                        [...questionList, question]
                    );
                    setPastEvents(
                        [...pastEvents.slice(1)]
                    );
                    logHelper(question);
                } else {
                    var question = `>>> What participant state (connecting state) as a result of [EV: ${precondEvents[0]}] causes or enables [EV: ${currentEvent}]?:: `
                    // console.log("PRECOND");
                    // console.log(precondEvents);
                    setPastEvents(
                        [...pastEvents, precondEvents[0]]
                    );
                    setPreCondEvents(
                        [...precondEvents.slice(1)]
                    );
                    setQuestionList(
                        [...questionList, question]
                    );
                    logHelper(question);
                }
            } else if (isNaN(answer)) {
                setPreCondEvents(
                    [...precondEvents, answer]
                );
                // console.log("HELLO");
                // console.log(linkStateGraph);
                setLinkStateGraph(
                    [...linkStateGraph.map(object => {
                        if (object.event == currentEvent) {
                            object.linked.push(answer);
                            return object;
                        } else {
                            return object;
                        }
                    }), {
                        event: answer,
                        linked: [currentEvent],
                        parents: [linkStateGraph.findIndex(x => x.event == currentEvent)]
                    }]
                );
                // console.log("GOODBYE");
                // console.log(linkStateGraph);
                logHelper(">>> Select the sentence where this event is mentioned (1 or 2 or ... or 5) or none :: ");
            } else if (!isNaN(answer)) {
                // console.log(currentEvent);
                var question = `>>> Event that DIRECTLY caused/enabled [EV: ${currentEvent}] ('none' to STOP):: `;
                setQuestionList(
                    [...questionList, question]
                );
                logHelper(question);
            }
        } else if (questionList[questionList.length - 1].includes('connecting state')) {
            if (isNaN(answer) && answer != "none") {
                var question = ">>> If it is directly mentioned in any sentence, specify it (1 or 2 ... or 5 or none) :: ";
                logHelper(question);
            } else if (!isNaN(answer) || answer == "none") {
                if (precondEvents.length == 0) {
                    var question = `>>> Apart from the events already selected for [EV: ${currentEvent}], are there any states DIRECTLY in the story that causes / enables this event ?? (y/n) ::`;
                    setQuestionList(
                        [...questionList, question]
                    );
                    logHelper(question);
                } else {
                    // console.log()
                    var question = `>>> What participant state (connecting state) as a result of [EV: ${precondEvents[0]}] causes or enables [EV: ${currentEvent}]?:: `
                    setPastEvents(
                        [...pastEvents, precondEvents[0]]
                    );
                    setPreCondEvents(
                        [...precondEvents.slice(1)]
                    );
                    setQuestionList(
                        [...questionList, question]
                    )
                    logHelper(question);
                }
            }
        } else if (questionList[questionList.length - 1].includes('Apart')) {
            // console.log("APART HIT WHOO")
            if (answer == "y") {
                var question = `>>> Event that DIRECTLY caused/enabled [EV: ${currentEvent}] ('none' to STOP):: `
                setQuestionList(
                    [...questionList, question]
                );
                logHelper(question);
            } else if (answer == "n") {
                // console.log("past events");
                // console.log(pastEvents);
                if (pastEvents.length > 0 && pastEvents[0]) {
                    var question = `>>> Event that DIRECTLY caused/enabled [EV: ${pastEvents[0]}] ('none' to STOP):: `
                    setCurrentEvent(
                        pastEvents[0]
                    );
                    setQuestionList(
                        [...questionList, question]
                    );
                    setPastEvents(
                        [...pastEvents.slice(1)]
                    );
                    logHelper(question);
                } else {
                    // console.log(linkStateGraph);
                    setDisabled(
                        !disabled
                    );
                }
            }
        }
    }

    const handleKeyPress = (ev) => {
        // console.log(currentEvent);
        if (ev.code === "Enter" && answer !== '') {
            nextQuestion();
        }
    }



    return(
    <div className="Questionnaire">
        <Grid className="Questionnaire2">
            <Grid item className="story">
                <Typography variant='h4' fontStyle="oblique" align='left'>Questionnaire</Typography>
            </Grid>
            <div className="log">
            <Box component={Paper}>
            {log.map((x, index) => {
                if (index % 2 == 0) {
                    return(<Grid item>
                    <Typography className="textBubble" variant='h6' align='left'>{x}</Typography>
                    </Grid>)
                } else {
                    return(<Grid item>
                    <Typography className="textBubble" variant='h6' align='right'>{x}</Typography>
                    </Grid>)
                }
            })}
            </Box>
            </div>
            <Grid item className="form">
                <FormControl component={Paper} fullWidth sx={{ m: 1 }}>
                <InputLabel >Answer</InputLabel>
                <OutlinedInput
                    disabled={disabled}
                    value={answer}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    label="Answer"
                />
                </FormControl>
                <Button onClick={returnData}> Download Data </Button>
            </Grid>
        </Grid>
    </div>)
}