import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import axios from 'axios';
import {
    getCurrentUserDetailsSuccess,
    getCurrentUserDetailsFailure,
} from 'src/dashboard/user/actions';

export const getCurrentUserDetailsService = (namespace) => {
    console.log('getCurrentUserDetailsService :>> ', namespace);
    return (action$) => {
        return action$.pipe(ofType(`${namespace}/API_GET_CURRENT_USER_DETAILS`),
            switchMap((action) => Observable.create((observable) => {
                axios.get(`https://api.github.com/users/manendrarawat`).then((response) => {
                    observable.next(getCurrentUserDetailsSuccess(response.data, namespace));

                    observable.complete();
                }).catch((error) => {
                    observable.next(getCurrentUserDetailsFailure({
                        status: error && error.response ? error.response.status : 500
                    }, namespace));

                    observable.complete();
                });
            }))
        );
    };
};
