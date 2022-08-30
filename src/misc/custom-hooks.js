import { useReducer, useEffect } from 'react';

function showsReducer(currState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...currState, action.showId];
    }

    case 'REMOVE': {
      return currState.filter(showId => showId !== action.showId);
    }

    default:
      return currState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    // Initial Sate initializer
    const persisted = localStorage.getItem(key); // To get the item from the local storage

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    // To achieve sync with local storage
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
