import React from 'react';
import { Container, Form, SubmitButton } from './styles';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Respositorios
      </h1>
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar Repositorio" />
        <SubmitButton disable>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}