import React, {useState, useEffect} from 'react';
import {getDatasets, updateDataset} from '../api/api';
import {Dataset} from '../api/api-definition';

const Data: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDatasets()
      .then(d => setData(d))
      .catch(err => console.log(err));
  }, []);

  return (
    <div></div>
  );
};

export default Data;
