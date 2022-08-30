import { useReducer, useEffect } from 'react';

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

// use Shows function call the usePersistedReducer hook and returns the respective data from the local storage
export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
