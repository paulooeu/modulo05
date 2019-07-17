import React from 'react';

// import { Container } from './styles';

export default function Repository({ match }) {
  return <h1>Repositororio:{decodeURIComponent(match.params.repository)}</h1>;
}
