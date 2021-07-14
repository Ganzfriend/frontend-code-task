import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {getDatasets, updateDataset} from '../api/api';
import {Dataset} from '../api/api-definition';
import Key from './Key';
import Category from './Category';
import styles from './styles';

const useStyles = makeStyles(styles);

const Data: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDatasets()
      .then(d => setData(d))
      .catch(err => console.log(err));
  }, []);

  const rows = ['Name', 'Id', 'Created At', 'Updated At'];

  return (
    // <div>
    //   {!!data.length && data.map(({name, stats}) => {
    //     const {row_count, keys, categories} = stats;
    //     return (
    //       <div key={name}>
    //         <h4>{name}</h4>
    //         <h5>Keys: </h5>
    //         {!!keys.length ? (
    //           keys.map(({id, label, null_fraction, distinct: _distinct}) => {
    //             const distinct = _distinct > 0 ? _distinct : Math.abs(_distinct) * row_count;
    //           return (
    //           <div key={id}>
    //             <h6>{label}</h6>
    //             <h6>Id: {id}</h6>
    //           </div>
    //           )
    //         }))
    //           : <p> No joining keys available </p>
    //         }
    //       </div>
    //     )
    //   })}
    // </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {rows.map((r, idx) => {
              const _align = idx === 0 ? "inherit" : "right";
              return (
                <TableCell key={r} align={_align}>{r}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data.length && data.map(({dataset_id, name, created_at, updated_at, stats}) => {
            const row =  {dataset_id, name, created_at, updated_at, stats};
            return (
              <Row key={name} row={row} />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Data;



function Row({row}) {
  const [open, setOpen] = useState(false);
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

  return (
    <React.Fragment>
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
        <TableCell align="right">{created_at}</TableCell>
        <TableCell align="right">{updated_at}</TableCell>
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
                                <TableCell align="right">Best Representation</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {categories.map((c, idx) => <Category key={idx} category={c} /> )}
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
    </React.Fragment>
  );
}
