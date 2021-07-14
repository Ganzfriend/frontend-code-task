import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import styles from './styles';

const useStyles = makeStyles(styles);

const Key = ({_key, rowCount}) => {
  const classes = useStyles();
  const {id, label, null_fraction, distinct} = _key;
  const nullCount = Math.ceil(null_fraction * rowCount);

  return (
  <TableContainer component={Paper}>
      <Table className={classes.keyTable}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Label</TableCell>
            <TableCell align="right">Null Entries</TableCell>
            <TableCell align="right">Distinct Entries</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={id}>
            <TableCell component="th" scope="row">
              {id}
            </TableCell>
            <TableCell align="right">{label}</TableCell>
            <TableCell align="right">{nullCount}</TableCell>
            <TableCell align="right">{distinct}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Key;