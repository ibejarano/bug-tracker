
import React from 'react';
import axios from 'axios';

class UserRegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConf: '',
            isAdmin: false,
            isDev: false,
        }
    }

    onUsernameChange(e){
        this.setState({
            username: e.target.value
        });
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

    onPasswordConfirmChange(e){
        this.setState({
            passwordConf: e.target.value
        })
    };

    async onSubmit(e){
        e.preventDefault();

        const params = {...this.state}

        try {
            const res = axios.post('http://localhost:5000/user/register', params);
            console.log(res)
            this.props.history.push('/')
        } catch(error){
            console.log(error)
        }
    };

    render(){

    return(
        <div>
            <h1>Sign up</h1>
            <form className='form-container' onSubmit={this.onSubmit.bind(this)} >
                <label>User name: </label>
                <input  name='username' type='text' placeholder='User Name'
                    onChange={this.onUsernameChange.bind(this) }
                    value={this.state.username} required
                /><br/>
                <label>E-mail: </label>
                <input  name='email' type='email' placeholder='Email'
                    onChange={this.onEmailChange.bind(this) }
                    value={this.state.email} required
                /><br/>
                <label>Password: </label>
                <input  name='password' type='password' placeholder='Password'
                    onChange={this.onPasswordChange.bind(this) }
                    value={this.state.password} required
                /><br/>
                <label>Repeat password: </label>
                <input  name='passwordConf' type='password' placeholder='Password Confirmation'
                    onChange={this.onPasswordConfirmChange.bind(this) }
                    value={this.state.passwordConf} required
                /><br/>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )}
};

export default UserRegisterForm;