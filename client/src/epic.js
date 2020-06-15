import { BehaviorSubject } from 'rxjs';
import { combineEpics } from 'redux-observable';

const createEpic = () => {
    return new BehaviorSubject(combineEpics());
};

export default createEpic;
