import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableCellProps
} from '@material-ui/core';

import {getDatasets, updateDataset} from '../api/api';
import Row from './Row';

const Data: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDatasets()
      .then(d => setData(d))
      .catch(err => console.log(err));
  }, []);

  const rows: string[] = ['Name', 'Id', 'Created At', 'Updated At'];

  return (
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
          {!!data.length && data.map((d, idx) => (
            <Row key={idx} row={d} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Data;
