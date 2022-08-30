import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

function Home() {
  const [input, setInput] = useLastQuery();
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
          {results[0].show ? (
            <ShowGrid data={results} />
          ) : (
            <ActorGrid data={results} />
          )}
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

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={searchPlaceHolder}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioChange}
            active="true"
            checked={isShowsSearch}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            type="radio"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResult()}
    </MainPageLayout>
  );
}

export default Home;
