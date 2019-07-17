import React, { Component } from 'react';
import { Container, Form, SubmitButton, List } from './styles';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const reponse = await api.get(`/repos/${newRepo}`);

    const data = {
      name: reponse.data.full_name,
    };
    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };
  //carregar os dados no localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  //salvar os dados no localStorage
  render() {
    const { newRepo, repositories, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Respositorios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <br />
        <List>
          {repositories.map(repositoriy => (
            <li key={repositoriy.name}>
              <span>{repositoriy.name}</span>
              <Link to={`/repository/${encodeURIComponent(repositoriy.name)}`}>
                Detalhe
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
