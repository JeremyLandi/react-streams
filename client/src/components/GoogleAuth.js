import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

  componentDidMount() {
    // gapi.load(libraries, callbackOrConfig)
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1040636547937-2he5c246g0ul9p71j9ge1ski7cskungn.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // Gets auth object on window and sets it to GoogleAuth Object
        this.auth = window.gapi.auth2.getAuthInstance();
        // Checks to see if user is signed in, and calls appropriate action
        this.onAuthChange(this.auth.isSignedIn.get());
        // listen() passes true to this function when the user signs in, and false when the user signs out.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => this.auth.signIn();
  onSignOutClick = () => this.auth.signOut();

  renderAuthButton() {
    if (this.props.isSignedIn === null) { 
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  render() { 
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}
 
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
