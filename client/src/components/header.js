import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    
    renderLinks(){
        if(this.props.authenticated) {
           // show a link to a sign in or sign up 
            return <li className="nav-item">
                        <Link className="nav-link" to="/signout">Sign Out </Link>
                   </li>
        }else
        return [
            <li className="nav-item">
                <Link className="nav-link" to="/signin" key={1}>Sign In </Link>
            </li>, 
            <li className="nav-item">
                <Link className="nav-link" to="/signup" key={2} >Sign up </Link>
          </li>
        ];
    }

    render(){ 
        return(
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand"  /> 
                 <ul className="nav navbar-nav">
                        {this.renderLinks()}
                </ul>
            </nav> 
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}


export default connect(mapStateToProps)(Header);