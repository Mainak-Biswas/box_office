import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';
  const [searchPlaceHolder, setSearchPlaceHolder] =
    useState('Search for Shows');

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results[0].show
            ? results.map(item => (
                <div key={item.show.id}>{item.show.name}</div>
              ))
            : results.map(item => (
                <div key={item.person.id}>{item.person.name}</div>
              ))}
        </div>
      );
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
    if (ev.target.value === 'shows') {
      setSearchPlaceHolder('Search for Shows');
    } else {
      setSearchPlaceHolder('Search for Actors');
    }
  };

  console.log(searchOption);

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={searchPlaceHolder}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioChange}
            active="true"
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>

      {renderResult()}
    </MainPageLayout>
  );
}

export default Home;
