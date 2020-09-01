import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//borrowed table from material-ui and modified it for our app use.
const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'time_in', label: 'Time_in', minWidth: 100 },
  {
    id: 'time_out',
    label: 'Time_out',
    minWidth: 170,
    align: 'right',
  },
];

function createData(date, time_in, time_out) {
  return {date, time_in, time_out};
}

const rows = [
  createData ('21/3/2020', '10:30 am', '5:00 pm'),
  createData ('22/3/2020', '10:30 am', '5:00 pm'),
  createData ('23/3/2020', '10:30 am', '5:00 pm'),
  createData ('24/3/2020', '10:30 am', '5:00 pm'),
  createData ('25/3/2020', '10:30 am', '5:00 pm'),
  createData ('26/3/2020', '10:30 am', '5:00 pm'),
  createData ('27/3/2020', '10:30 am', '5:00 pm'),
  createData ('28/3/2020', '10:30 am', '5:00 pm'),
  createData ('29/3/2020', '10:30 am', '5:00 pm'),
  createData ('30/3/2020', '10:30 am', '5:00 pm'),
  createData ('01/4/2020', '10:30 am', '5:00 pm'),
  createData ('02/4/2020', '10:30 am', '5:00 pm'),
  createData ('03/4/2020', '10:30 am', '5:00 pm'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}