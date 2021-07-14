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
    <div>
      {!!data.length && data.map(({name, stats}) => {
        const {row_count, keys, categories} = stats;
        return (
          <div>
            <h5>{name}</h5>
            <h6>Keys: </h6>
            {!!keys.length ? (
              keys.map(({id, label, null_fraction, distinct: _distinct}) => {
                const distinct = _distinct > 0 ? _distinct : Math.abs(_distinct) * row_count;
              return (
              <div>
                {label}
                Id: {id}
              </div>
              )
            }))
              : <p> No joining keys available </p>
            }
          </div>
        )
      })}
    </div>
  );
};

export default Data;
