import React from 'react';
import ActorCard from './ActorCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';

function ActorGrid({ data }) {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          name={person.name}
          country={person.country}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
          summary={person.summary}
        />
      ))}
    </FlexGrid>
  );
}

export default ActorGrid;
