import React, {Component} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function EventStates({tableData}) {

    console.log("Table Data: ");
    console.log(tableData);

    return(
        <div className="EventStates">
        <Grid className="EventStates"  justifyContent="center" container direction={'column'} sx={{height:300}}>
            <TableContainer component={Paper} sx={{height:300}}>
            <Typography variant='h4' fontStyle="oblique" align='center'>Event Table</Typography>
                <Table sx={{height:"max-content"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Linked States</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow
                        key={row.event ? index: null}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell scope="row">
                            {row.event ? index: null}
                        </TableCell>
                        <TableCell >{row.event ? row.event: null}</TableCell>
                        <TableCell >{row.event ? row.linked.join(', '): null}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </div>
    )
}