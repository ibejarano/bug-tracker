import React from 'react';
import { authenticationService } from '../services/authentication-services';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        if (authenticationService.currentUserValue){
            this.props.history.push('/');
        }
    }

    onEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value,
        })
    };

    async onSubmit(e){
        e.preventDefault();

        const params = {...this.state}

        const res = await authenticationService.login(params.email, params.password);
        console.log(res)
        const { from } = this.props.location.state || { from: {pathname: '/' }};
        this.props.history.push(from);
    }

    render(){

    return(
        <div>
            <h1>Login</h1>
            <form className='form-container' onSubmit={this.onSubmit.bind(this)} >
                <label>Email: </label>
                <input  name='email' type='email' placeholder='Email'
                    onChange={this.onEmailChange.bind(this) }
                    value={this.state.email} required
                /><br/>
                <label>Password: </label>
                <input  name='password' type='password' placeholder='Password'
                    onChange={this.onPasswordChange.bind(this) }
                    value={this.state.password} required
                /><br/>
                <button type='submit'>Login</button>
            </form>
        </div>

    )}
};

export default LoginPage;