import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import forIn from 'lodash/forIn';
import forEach from 'lodash/forEach';
import store, { injectAsyncReducer, injectAsyncEpic } from 'src/store';

const asyncComponent = (load) => {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null,
                hasError: false
            };
        }

        async componentDidMount() {
            try {
                const component = load.component();

                if (isFunction(load.reducers) === true) {
                    const { default: importedReducers } = await load.reducers();

                    forIn(importedReducers, (reducer, name) => {
                        injectAsyncReducer(store, name, reducer);
                    });
                }

                if (isFunction(load.epics) === true) {
                    const { default: importedEpics } = await load.epics();
                    forEach(importedEpics, (epic) => {
                        injectAsyncEpic(epic);
                    });
                }

                const { default: importedComponent } = await component;

                this.setState({
                    component: importedComponent
                });
            }
            catch (error) {
                console.log('error>>>>', error);
                this.setState({
                    hasError: true
                });
            }
        }

        render() {
            if (this.state.hasError === true) {
                return (
                    <h2>Error >>>>>>></h2>
                );
            }

            const Component = this.state.component;

            if (Component) {
                return (
                    <Component {...this.props} />
                );
            }

            return (
                <div>Loading.....</div>
            );
        }
    }

    return AsyncComponent;
};

export default asyncComponent;