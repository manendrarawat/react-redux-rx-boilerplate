
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentUserDetails } from 'src/dashboard/user/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(){
        this.props.login();
    }

    render(){
        return (
            <div>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(getCurrentUserDetails('session'));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
