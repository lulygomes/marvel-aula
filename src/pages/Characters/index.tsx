import React, { useState } from 'react';
import api from '../../services/api';

import { Container, CardList, Card } from './styles';

interface ResponseDTO {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<ResponseDTO[]>([]);
  console.log(characters);
  useState(() => {
    api
      .get('/characters')
      .then(response => {
        setCharacters(response.data.data.results);
      })
      .catch(err => console.log(err.response.data));
  });

  return (
    <Container>
      <CardList>
        {characters.map(character => (
          <Card key={character.id} thumbnail={character.thumbnail}>
            <div id="img" />
            <h2>{character.name}</h2>
            <h2>{character.description}</h2>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default Characters;
