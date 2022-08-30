import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function showsReducer(currState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...currState, action.showId];
      // If the show is not starred then add the id
    }

    case 'REMOVE': {
      return currState.filter(showId => showId !== action.showId);
      // If the show is starred then remove the id
    }

    default:
      return currState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    // Initial Sate initializer

    const persisted = localStorage.getItem(key);
    // To get the item from the local storage

    return persisted ? JSON.parse(persisted) : initial;
    // Returns the item fetched from the local starage to the hook
  });

  useEffect(() => {
    // To achieve sync with local storage
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

// use Shows function call the usePersistedReducer hook
// and returns data from the local storage
export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
//
//
//
// For data persistency -> Data will be stored in session
export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    // Lazy init so that the state is initialized only once and not reinitilized when changed

    const persistedData = sessionStorage.getItem(key);
    // To fetch/get the data from the session storage

    return persistedData ? JSON.parse(persistedData) : '';
    // Returns the data fetched from the session starage to the hook
  });

  const setPersistedInput = newState => {
    // To send data in JSON input format
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}
//
//
//
//
//
// Hooks for Show

// Reducer for hook
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
// Hook
export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    // isMounted variable maintains that the variables are not being used after being unmounted since the variable states are asynchronous.

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
}
