import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import styles from './styles';

const useStyles = makeStyles(styles);

const Category = ({category, rowCount}) => {
  // TODO: Add checks to ensure null/distinct/duplicate count is accurate and totals to rowCount
  // then add cases dealing with inaccurate values
  const classes = useStyles();
  const {id, name, best_representation} = category;
  const {statistics, representation_id, representation_name} = best_representation;
  const {null_fraction, distinct: _distinct, most_common} = statistics; // Not using most_common, but including it in destructuring for clarity

  const nullCount = Math.ceil(null_fraction * rowCount);
  const distinct = _distinct > 0 ? _distinct : Math.ceil(Math.abs(_distinct) * rowCount);
  const diff = Math.ceil(rowCount - nullCount - distinct);
  const duplicate = diff < 0 ? 0 : diff;

  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">{id}</TableCell>
      <TableCell align="right" >{name}</TableCell>
      <TableCell align="right">{nullCount}</TableCell>
      <TableCell align="right">{distinct}</TableCell>
      <TableCell align="right">{duplicate}</TableCell>
    </TableRow>
  );
};

export default Category;
