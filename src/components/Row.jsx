import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';

import Key from './Key';
import Category from './Category';
import styles from './styles';

const useStyles = makeStyles(styles);

const Row = ({row}) => {
  const classes = useStyles();

  const {
    dataset_id,
    name,
    created_at,
    updated_at,
    stats
  } = row;

  const {
    row_count,
    keys,
    categories
  } = stats;

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow className={classes.tableRoot}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{dataset_id}</TableCell>
        <TableCell align="right">{moment(created_at).format('MMMM Do YYYY, h:mm:ssa')}</TableCell>
        <TableCell align="right">{moment(updated_at).format('MMMM Do YYYY, h:mm:ssa')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Stats
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Row Count</TableCell>
                    <TableCell>Keys</TableCell>
                    <TableCell>Categories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {row_count}
                    </TableCell>
                    <TableCell >
                      {!!keys.length ? (
                        <TableContainer component={Paper}>
                          <Table className={classes.keyTable}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Label</TableCell>
                                <TableCell align="right">Null Entries</TableCell>
                                <TableCell align="right">Distinct Entries</TableCell>
                                <TableCell align="right">Duplicate Entries</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {keys.map((k, idx) => <Key key={idx} _key={k} rowCount={row_count} /> )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )
                        : <Typography> No joining keys available </Typography>
                      }
                    </TableCell>
                    <TableCell >
                      {!!categories.length ? (
                        <TableContainer component={Paper}>
                          <Table className={classes.categoryTable}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Null Entries</TableCell>
                                <TableCell align="right">Distinct Entries</TableCell>
                                <TableCell align="right">Duplicate Entries</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {categories.map((c, idx) => <Category key={idx} category={c} rowCount={row_count} /> )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )
                        : <Typography> No category data available </Typography>
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default Row;