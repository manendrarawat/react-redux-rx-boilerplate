import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from 'src/error-boundary.jsx';
import asyncComponent from 'src/async-component';

const Login = asyncComponent({
    component: () => import('src/dashboard/user/login/login.jsx'),
    reducers: () => import('src/dashboard/user/login/reducer'),
    epics: () => import('src/dashboard/user/login/epic')
});


//const Login = () => <div>This is login page</div>;
const SignUp = () => <div>This is signup page</div>;
const Dashboard = () => <div>This is Dashboard page having private route</div>;



class App extends Component {

    constructor(props){
       super(props);
    }

    render(){
        return (
            <ErrorBoundary>
                <BrowserRouter>
                    <Switch>
                        <Route path="/gru/login" exact={true} component={Login} />
                        <Route path="/gru/signup" exact={true} component={SignUp} />
                        <Route path="/gru/" exact={true} component={Dashboard} />
                    </Switch>
                </BrowserRouter>
            </ErrorBoundary>
        )
    }
}

export default App;