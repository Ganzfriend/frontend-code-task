import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import styles from './styles';

const useStyles = makeStyles(styles);

const Category = ({category}) => {
  const classes = useStyles();
  const {id, name, best_representation} = category;
  // const nullCount = Math.ceil(null_fraction * rowCount);
  // const distinct = _distinct > 0 ? _distinct : Math.ceil(Math.abs(_distinct) * rowCount);

  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">{id}</TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right" >{name}</TableCell>
    </TableRow>
  );
};

export default Category;

