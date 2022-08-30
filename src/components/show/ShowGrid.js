import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';

function ShowGrid({ data }) {
  return (
    <div>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          summary={show.summary}
          name={show.name}
        />
      ))}
    </div>
  );
}

export default ShowGrid;
