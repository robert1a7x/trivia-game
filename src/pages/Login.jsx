import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { getTokenActionThunk, getUserAction } from '../actions';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => { this.handleValidation(); });
  }

  handleValidation() {
    const { name, email } = this.state;

    if (name && email) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick() {
    const { getToken, getUser, history } = this.props;
    const { name, email } = this.state;

    getToken();
    getUser({ name, email: email.toLowerCase() });
    history.push('/game');
  }

  render() {
    const { name, email, disabled } = this.state;
    const { error, message } = this.props;
    return (
      <div className="login-background">
        <img src={ logo } alt="trivia-logo" />
        <form>
          <label htmlFor="name">
            <input
              placeholder="Nome"
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        { error && <p>{`Erro: ${message} - tente novamente`}</p>}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getUser: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  getToken: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.triviaReducer.error,
  message: state.triviaReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenActionThunk()),
  getUser: (payload) => dispatch(getUserAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
