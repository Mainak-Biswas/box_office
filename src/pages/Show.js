import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

function Show() {
  const { id } = useParams();

  const [show, setShow] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=episodes&embed[]=cast`).then(results => {
      setShow(results);
    });
  }, [id]);
  // Takes 2 args, callback function , Array of dependency
  // call back function will run when something in the array changes

  console.log('Show', show);
  return <div>This is show Page: {id} </div>;
}

export default Show;
