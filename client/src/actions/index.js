
import axios from 'axios';
const ROOT_URL = 'http://localhost:4000';
import {browserHistory } from 'react-router';
import { AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        FETCH_MESSAGE
     } from './types'


export function signinUser({ email, password }){
    return function(dispatch){
    
    
    //submit email/pass to the server
    axios.post(`${ROOT_URL}/auth/signin`,{email,password})
        .then(res => {
            //if request is good update state
            //- update state to indivate user is authenticaed 
            console.log(res);
            dispatch({type: AUTH_USER});
            //-save the jwt token
            localStorage.setItem('token',res.data.token);
            // -redirect to the route /feature
            browserHistory.push('/feature')
        })
        .catch((res)=>{
    //if request is bad
    //-show error to the user
            //debugger
            dispatch(authError(res.data.error))
        });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
} 

export function signoutUser(){
    localStorage.removeItem('token');
    return { type: UNAUTH_USER}

}

export function signupUser({ email, password,firstname,lastname,username }){
    return function(dispatch){
    
    
    //submit fields to the server
    axios.post(`${ROOT_URL}/auth/signup`,{email,password,firstname,lastname,username})
        .then(res => {
            //if request is good update state
            //- update state to indivate user is authenticaed 
            console.log(res);
            dispatch({type: AUTH_USER});
            //-save the jwt token
            localStorage.setItem('token',res.data.token);
            // -redirect to the route /feature
            browserHistory.push('/feature')
        })
        .catch((res)=>{
    //if request is bad
    //-show error to the user
            debugger
            dispatch(authError(res.error));
        });
    }
}

export function fetchMessage(){
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
            .then(res =>{
                console.log(res);
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: res.data.message
                })
            }).catch(res => {
                dispatch(authError(res.error))
            });

    }
}