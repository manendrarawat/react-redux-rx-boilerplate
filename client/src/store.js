import { createStore, applyMiddleware } from 'redux';
import { mergeMap } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReducer from 'src/reducer';
import createEpic from 'src/epic';
import actionMiddleware from 'src/action-middleware';
import httpMiddleware from 'src/http-middleware';


const epicMiddleware = createEpicMiddleware();
const reducer = createReducer();
const epic$ = createEpic();
const epics = [];

const rootEpic = (action$, state$) => {
    return epic$.pipe(mergeMap((epic) => {
        return epic(action$, state$);
    }));
};

const configureStore = () => {
    const initialState = {}
    const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(epicMiddleware, actionMiddleware)));
    store.asyncReducers = {};
    epicMiddleware.run(rootEpic);
    httpMiddleware.run(store);
    return store;
};

export const injectAsyncReducer = (store, name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
};

export const injectAsyncEpic = (asyncEpic) => {
    console.log('asyncEpic :>> ', asyncEpic);
    if (epics.indexOf(asyncEpic) === -1) {
        epic$.next(asyncEpic);
        epics.push(asyncEpic);
    }
};



const store = configureStore();
export default store;