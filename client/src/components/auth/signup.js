import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
     handleFormSubmit(formProps){
        //call action creator to sign up user
        this.props.signupUser(formProps);

    }

    renderAlert() {
        if(this.props.errorMessage){
            return ( 
                <div className="alert alert-danger">
                    <strong> Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    
    render() {
        const{ handleSubmit, fields: {firstname, lastname, username, email, password, passwordConfirm}} = this.props
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>First Name: </label>
                    <input className='form-control' {...firstname} />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Last Name: </label>
                    <input className='form-control' {...lastname} />
                </fieldset>
                <fieldset className='form-group'>
                    <label>UserName: </label>
                    <input className='form-control' {...username} />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Email: </label>
                    <input className='form-control' {...email} />
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password: </label>
                    <input className='form-control' type="password" {...password} />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>Confirm Password: </label>
                    <input className='form-control' type="password" {...passwordConfirm} />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>

            </form>
        );
    }
}

function validate(formProps){
    const errors = {};
    console.log(formProps)
    if(!formProps.email){
        errors.email = 'Please enter an email!'
    }
    if(!formProps.password){
        errors.password = 'Please enter an password!'
    }
    if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter an email!'
    }
    if(formProps.password !== formProps.passwordConfirm){
        errors.password = "Passwords must match!"
    }
    return errors;
}

function mapStateToProps(state) {
    return { error: state.auth.error}
}

export default reduxForm({
    form: 'signup',
    fields: ['firstname','lastname','username','email','password','passwordConfirm'],
    validate: validate},
    mapStateToProps, actions)(Signup);