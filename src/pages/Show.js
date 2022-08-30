import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

function Show() {
  const { id } = useParams();

  const [show, setShow] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    // isMounted variable maintains that the variables are not being used after being unmounted since the variable states are asynchronous.

    apiGet(`/shows/${id}?embed[]=episodes&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          // Until timeout ends "isLoading" will be true
          if (isMounted) {
            setShow(results);
            setIsLoading(false);
          }
        }, 100);
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      // Clean up will set ismounted to false -> All the async vars will no longer run in background
      isMounted = false;
    };
  }, [id]);
  // Takes 2 args, callback function , Array of dependency
  // call back function will run when something in the array changes

  console.log('Show', show);

  if (isLoading) {
    // Until timeout ends "isLoading" will be true
    return <div>Data is being Loaded</div>;
  }
  if (error) {
    <div>Error Occured: {error}</div>;
  }
  return <div>This is show Page: {id} </div>;
}

export default Show;
