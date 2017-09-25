import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const fetchUser = () => async dispatch => {

    if (!localStorage.getItem('token')) {
        dispatch({ type: FETCH_USER, payload: false });
    } else {

        console.log('seguiu222....');
        const res = await axios.get('/api/current_user', {
            headers: { authorization: localStorage.getItem('token') }
        });

        dispatch({ type: FETCH_USER, payload: res.data });
    }
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

//auth
export function signupUser({ email, password }, history) {
    return function (dispatch) {
        //Submit email/passwordo to the server
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/feature');
            })
            .catch(err => {
                dispatch(authError(err.response.data.error))
            });
    }
}

export function signinUser({ email, password }, history) {
    return function (dispatch) {
        //Submit email/passwordo to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route '/feature'
                history.push('/feature');

            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}