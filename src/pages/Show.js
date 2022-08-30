/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';

const reducer = (curState, action) => {
  // reducer function for useReducer hook
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { ...curState, isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...curState, isLoading: false, error: action.error };
    }
    default:
      return curState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
function Show() {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    // isMounted variable maintains that the variables are not being used after being unmounted since the variable states are asynchronous.

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          // Until timeout ends "isLoading" will be true
          if (isMounted) {
            dispatch({ type: 'FETCH_SUCCESS', show: results });
          }
        }, 100);
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
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

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
}

export default Show;
